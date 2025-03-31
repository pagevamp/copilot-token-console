import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import httpStatus from 'http-status';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

type RequestHandler = (req: NextRequest) => Promise<NextResponse>;

const prisma = new PrismaClient();

export const withErrorHandler = (handler: RequestHandler) => {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (err: unknown) {
      let status: number = httpStatus.INTERNAL_SERVER_ERROR;
      let message: string | undefined = 'Something went wrong';
      if (err instanceof ZodError) {
        status = httpStatus.UNPROCESSABLE_ENTITY;
        message = err.issues
          .map((issue) => `${issue.path[0]}: ${issue.message}`)
          .join(', ');
      } else if (axios.isAxiosError(err)) {
        console.log({ error: err.response?.data });
        status = err.response?.status || httpStatus.INTERNAL_SERVER_ERROR;
        message = err.response?.data?.message || err.message;
      }

      console.log({ err });

      return NextResponse.json({ message: message }, { status });
    } finally {
      await prisma.$disconnect();
    }
  };
};

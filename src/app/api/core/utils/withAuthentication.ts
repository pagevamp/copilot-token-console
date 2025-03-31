import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';
import { getTokenPayload } from '@/actions/token';

type RequestHandler = (req: NextRequest) => Promise<NextResponse>;

export const withAuthentication = (handler: RequestHandler) => {
  return async (req: NextRequest) => {
    const token = req.headers.get('X-TOKEN');
    if (!token) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: httpStatus.UNAUTHORIZED }
      );
    }
    const parsedToken = await getTokenPayload(token);

    if (!parsedToken) {
      return NextResponse.json(
        { message: 'Failed to parse token' },
        { status: httpStatus.UNAUTHORIZED }
      );
    }
    return await handler(req);
  };
};

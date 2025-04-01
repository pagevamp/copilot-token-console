'use server';
import { getRequest } from '@/helper/axios.helper';
import { copilotAPIKey, copilotBaseAPIUri } from '@/config';
import { Token } from '@/types/token.dto';
import { CopilotApi } from '@/utils/CopilotApi';
import axios from 'axios';

const headers = {
  accept: 'application/json',
  'X-API-KEY': copilotAPIKey,
};

export async function getTokenPayload(token: string): Promise<Token | null> {
  try {
    const copilotClient = new CopilotApi(token);
    const payload = await copilotClient.getTokenPayload();
    return payload as Token;
  } catch (err) {
    console.log({ err });
    return null;
  }
}

export const getElementDetailFromId = async ({
  id,
  idKey,
}: {
  id: string;
  idKey: string;
}) => {
  try {
    let url = copilotBaseAPIUri;

    switch (idKey) {
      case 'clientId':
        url += `/clients/${id}`;
        break;

      case 'companyId':
        url += `/companies/${id}`;
        break;

      case 'internalUserId':
        url += `/internal-users/${id}`;
        break;

      case 'workspaceId':
        url += `/workspaces/${id}`;
        break;

      default:
        return 'Undefined';
    }

    return await getRequest(url, headers);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const response = error.response;
      if (response && response.data) {
        const { message, statusCode } = response.data;
        if (statusCode !== 200) {
          console.log('Conflict error: ', message);
          return { message, statusCode };
        }
        return { message, statusCode };
      }
      if (error.code === 'ECONNREFUSED') {
        return {
          message:
            'Connection refused. Please try again later or contact support.',
          statusCode: 500,
        };
      }
    } else {
      return {
        message:
          'Unknown server error, Please try again later or contact support.',
        statusCode: 500,
      };
    }
  }
};

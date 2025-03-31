import { Token } from '@/types/token.dto';
import ParsedTokenDisplay from './parsedToken';

export default async function ParsedTokenServer({
  token,
  tokenPayload,
}: {
  token: string;
  tokenPayload: Token;
}) {
  return <ParsedTokenDisplay token={token} tokenPayload={tokenPayload} />;
}

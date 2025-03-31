import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { z } from 'zod';
import ParsedTokenServer from '@/components/ui/console/parsedToken';
import NotificationServer from '@/components/ui/console/notification';
import { MessageCard } from '@/components/ui/global/messageCard';
import { getTokenPayload } from '@/actions/token';

export default async function Home({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const queryClient = new QueryClient();

  const { token } = await searchParams;
  if (!token) {
    return <MessageCard message="No token available" className="mt-10" />;
  }

  const parsedToken = z.string().safeParse(token);
  if (!parsedToken.success) {
    return <MessageCard message="Failed to parse token" className="mt-10" />;
  }

  const tokenPayload = await getTokenPayload(token);

  if (!tokenPayload) {
    return <MessageCard message="Not a valid token" className="mt-10" />;
  }

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="h-full px-16 py-5 flex justify-center">
        <div className="md:w-4xl w-full">
          <div>
            <div className="text-xl mb-2">Your Token:</div>
            <div className="text-pretty text-sm break-words border-1 p-2 rounded-sm bg-input/30">
              {token}
            </div>
          </div>

          {/* Parsed token */}
          <div className="flex justify-center my-10">
            {tokenPayload ? (
              <ParsedTokenServer token={token} tokenPayload={tokenPayload} />
            ) : (
              <div>No token payload</div>
            )}
          </div>

          {/* Notification */}
          <NotificationServer />
        </div>
      </main>
    </HydrationBoundary>
  );
}

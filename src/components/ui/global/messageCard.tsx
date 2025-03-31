import { cn } from '@/lib/utils';

export const MessageCard = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div className={cn('flex justify-center items-center', className)}>
      <div className="text-3xl font-bold">{message}</div>
    </div>
  );
};

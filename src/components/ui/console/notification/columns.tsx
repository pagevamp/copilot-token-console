'use client';

import { useNotificationDelete } from '@/hook/useNotification.hook';
import { NotificationType } from '@/types/notification.dto';
import { Trash } from '@phosphor-icons/react/dist/ssr';
import { ColumnDef } from '@tanstack/react-table';

function DeleteNotification({ id }: { id?: number }) {
  const { mutation, isLoading } = useNotificationDelete();

  return (
    <button
      className={`${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      disabled={isLoading}
      onClick={() => {
        if (
          id &&
          confirm('Are you sure you want to delete this notification?')
        ) {
          mutation.mutate(id);
        }
      }}
    >
      <Trash size={20} className="text-[var(--error)]" />
    </button>
  );
}

export const columns: ColumnDef<NotificationType>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'createdAt',
    header: 'Dispatched At',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <DeleteNotification id={row.original.id} />
        </div>
      );
    },
  },
];

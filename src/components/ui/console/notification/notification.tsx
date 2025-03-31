'use client';
import { DataTable } from '../../global/datatable';
import { columns } from './columns';
import { useNotificationList } from '@/hook/useNotification.hook';
import { CreateNotification } from './create';

export default function Notification() {
  const { isLoading, data } = useNotificationList();

  return (
    <div>
      <div className="flex justify-between text-2xl font-bold mb-4">
        Notifications
        <CreateNotification />
      </div>
      <DataTable columns={columns} data={data ?? []} isLoading={isLoading} />
    </div>
  );
}

import { useState } from 'react';
import { NotificationApiService } from '@/service/api.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { NotificationType } from '@/types/notification.dto';
import { NOTIFICATION } from '@/reactQuery/queryKeys';
import { defaultNotificationValues } from '@/components/ui/console/notification/create';

export function useNotificationList() {
  const [isLoading, setIsLoading] = useState(false);

  const notifications = useQuery({
    queryKey: [NOTIFICATION],
    queryFn: async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          return [];
        }
        const headers = {
          'X-TOKEN': token,
        };
        const data = await NotificationApiService.getAll(headers);
        setIsLoading(false);
        return data.data;
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error?.message || 'Something went wrong');
        return [];
      }
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 mins
  });
  return { data: notifications.data, isLoading };
}

export function useNotificationCreate(
  reset: (values: typeof defaultNotificationValues) => void,
  setIsDialogOpen: (isOpen: boolean) => void
) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: NotificationType) => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const headers = {
        'X-TOKEN': token,
      };
      return await NotificationApiService.create(data, headers);
    },
    onSuccess: (data) => {
      setIsLoading(false);
      reset(defaultNotificationValues);
      setIsDialogOpen(false);
      toast.success(data?.message || 'Notification created successfully.');
      queryClient.invalidateQueries({ queryKey: [NOTIFICATION] });
    },
    onError: (error: any) => {
      setIsLoading(false);
      toast.error(error?.message || 'Something went wrong');
      console.log({ error });
    },
  });

  return { mutation, isLoading };
}

export function useNotificationDelete() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const headers = {
        'X-TOKEN': token,
      };
      return await NotificationApiService.delete(id, headers);
    },
    onSuccess: (data) => {
      setIsLoading(false);
      toast.success(data?.message || 'Notification deleted successfully.');
      queryClient.invalidateQueries({ queryKey: [NOTIFICATION] });
    },
    onError: (error: any) => {
      setIsLoading(false);
      toast.error(error?.message || 'Something went wrong');
      console.log({ error });
    },
  });

  return { mutation, isLoading };
}

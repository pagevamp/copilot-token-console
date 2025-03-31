import { Plus } from '@phosphor-icons/react/dist/ssr';
import { Button } from '../../shared/button';
import { DialogWithForm } from '../../global/customDialog';
import { useState } from 'react';
import { Label } from '../../shared/label';
import { Input } from '../../shared/input';
import { Textarea } from '../../shared/textarea';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNotificationCreate } from '@/hook/useNotification.hook';
import { NotificationType } from '@/types/notification.dto';
import { useTokenContext } from '@/context/token.context';
import { toast } from 'react-toastify';

export const defaultNotificationValues: NotificationType = {
  title: '',
  description: '',
  senderId: '',
  recipientId: '',
};

export const CreateNotification = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<NotificationType>({
    defaultValues: defaultNotificationValues,
  });

  const { mutation, isLoading } = useNotificationCreate(reset, setIsDialogOpen);
  const { parsedToken } = useTokenContext();

  const onSubmit: SubmitHandler<NotificationType> = (
    data: NotificationType
  ) => {
    if (
      !parsedToken ||
      (parsedToken && !parsedToken.internalUserId && !parsedToken.clientId)
    ) {
      toast.error('Cannot send notification. SenderId not found.');
      return;
    }
    const senderId = (parsedToken.internalUserId ??
      parsedToken.clientId) as string;
    const payload: NotificationType = {
      ...data,
      senderId: senderId,
    };
    mutation.mutate(payload);
  };

  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        title="Create Notification"
        className="cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <Plus size={20} className="text-[var(--primary)]" />
      </Button>
      <DialogWithForm
        title="Create Notification"
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="title" className="text-right mb-2">
              Title <span>*</span>
            </Label>
            <Input
              id="title"
              type="text"
              className="col-span-3"
              {...register('title', {
                required: { value: true, message: 'Title is required' },
              })}
            />
            {errors.title && (
              <span className="text-sm text-[var(--error)]">
                {errors.title?.message}
              </span>
            )}
          </div>
          <div className="mt-4">
            <Label htmlFor="recipientId" className="text-right mb-2">
              Recipient Token <span>*</span>
            </Label>
            <Input
              id="recipientId"
              type="text"
              className="col-span-3"
              {...register('recipientId', {
                required: {
                  value: true,
                  message: 'Recipient token is required',
                },
              })}
            />
            {errors.recipientId && (
              <span className="text-sm text-[var(--error)]">
                {errors.recipientId?.message}
              </span>
            )}
          </div>
          <div className="my-4">
            <Label htmlFor="description" className="text-right mb-2">
              Description <span>*</span>
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              aria-describedby="description"
              {...register('description', {
                required: { value: true, message: 'Description is required' },
              })}
            />
            {errors.description && (
              <span className="text-sm text-[var(--error)]">
                {errors.description?.message}
              </span>
            )}
          </div>
          <Button type="submit" className="cursor-pointer" disabled={isLoading}>
            {isLoading ? 'Processing' : 'Create'}
          </Button>
        </form>
      </DialogWithForm>
    </div>
  );
};

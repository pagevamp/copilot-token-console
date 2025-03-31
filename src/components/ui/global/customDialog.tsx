import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/shared/dialog';

export function DialogWithForm({
  children,
  title,
  description,
  isOpen = false,
  setIsOpen,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal>
      <DialogContent
        className="sm:max-w-[600px] max-w-[400px]"
        aria-describedby="description"
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription>{description}</DialogDescription>
          ) : null}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

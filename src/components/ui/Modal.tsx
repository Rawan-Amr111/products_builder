import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
interface IProps {
  isOpen: boolean;
  close: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}
const MyModal = ({ isOpen, close, title, description, children }: IProps) => {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              {title && (
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-black text-center"
                >
                  {title}
                </DialogTitle>
              )}
              {description && (
                <p className="mt-2 text-sm text-gray-500 text-center">
                  {description}
                </p>
              )}

              <div className="mt-4">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default MyModal;

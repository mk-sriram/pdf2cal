import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";

interface SuccessModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-sm data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-green-600"
                  />
                </div>
                <div className="mt-3 text-center">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-800"
                  >
                    Success!
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">
                      Your schedule has been successfully converted into
                      calendar events
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default navigation
                  window.location.href = "/"; // Force a full page reload
                }}
                className="inline-flex justify-center rounded-md bg-[#0b7dffd4] px-4 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto transition-all transform active:scale-[0.98] hover:scale-[1.009]"
              >
                Go back to dashboard
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
export default SuccessModal; 
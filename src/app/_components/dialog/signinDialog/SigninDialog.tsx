import { Dialog, Transition } from "@headlessui/react";
import { signIn } from "next-auth/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { FcGoogle } from "react-icons/fc";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
};

/**
 * SigninDialog
 */
export const SigninDialog = ({ open, setOpen, text }: Props) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-drawer-dialog-z"
        onClose={() => setOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {/* TODO: Dialogはuiに切り出す */}
              <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 pb-7 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-center text-lg font-medium leading-6 text-gray-900"
                >
                  DevLocator
                </Dialog.Title>
                <div className="mt-5">
                  <p className="text-sm text-gray-500">{text}</p>
                </div>

                <div className="mt-5 flex justify-center">
                  {/* TODO: ボタンはuiに切り出す */}
                  <button
                    onClick={() =>
                      signIn("google", {
                        callbackUrl: "http://localhost:3000",
                      })
                    }
                    className="flex items-center justify-start rounded-md border border-sub px-4 py-2 text-sm transition ease-in-out hover:bg-custom-hover-white"
                  >
                    <FcGoogle className="mr-4 text-3xl" />
                    Googleアカウントでログイン
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

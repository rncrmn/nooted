import React, { Fragment, useState, useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AppContext } from "../context/AppContext";

interface Props {
  note: {
    id: string;
    content: string;
  };
  keyId: number;
}

function Note({ note: { id, content: oldContent }, keyId }: Props) {
  const { content, setContent, updateNote, deteteNote } =
    useContext(AppContext);

  const [existingContent, setExistingContent] = useState<string>(oldContent);

  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {}, [content]);

  return (
    <>
      {/* <Transition
        appear
        as={Fragment}
        show={true}
        enter="transform transition duration-[600ms]"
        enterFrom="scale-0"
        enterTo="scale-100"
        leave="transform transition duration-[1000ms]"
        leaveFrom="scale-100"
        leaveTo="scale-0"
      > */}
      <div
        className={`transition ease-in-out relative flex-col gap-4 p-5 bg-green-200 rounded-md shadow-md basis-72 ${
          isOpen ? "invisible" : "visible"
        }`}
        onClick={openModal}
      >
        <div className="h-[150px] font-medium font-mono outline-none overflow-hidden whitespace-pre-line">
          {existingContent}
        </div>
      </div>
      {/* </Transition> */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-full max-w-lg px-6 pt-6 pb-10 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <textarea
                    className="block w-full overflow-auto font-mono font-medium outline-none resize-none h-80"
                    value={existingContent}
                    onChange={(e) => {
                      let html = e.target.value;
                      setContent(html);
                      setExistingContent(html);
                    }}
                  />
                  <div className="absolute flex justify-end gap-2 bottom-5 right-5">
                    <button
                      onClick={() => {
                        closeModal();
                        updateNote(keyId, id, content);
                      }}
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        height="24"
                        width="24"
                        className="text-green-700"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        closeModal();
                        deteteNote(keyId, id);
                      }}
                    >
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        height="24"
                        width="24"
                        className="text-rose-700"
                        type="button"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                      </svg>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
  {
    /* {showButtons && (
        
      )} */
  }
}

export default Note;

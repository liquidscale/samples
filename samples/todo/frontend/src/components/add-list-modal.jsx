/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";

export default function AddListModal({ open, onSubmit, onClose }) {
  const cancelButtonRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='fixed z-10 inset-0 overflow-y-auto' initialFocus={cancelButtonRef} onClose={onClose}>
        <div className='flex md:items-end justify-center md:min-h-screen pt-20 md:pt-4 px-4 md:pb-20 text-center sm:block sm:p-0'>
          <Transition.Child as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <Dialog.Overlay className='fixed inset-0 bg-gray-900 bg-opacity-80 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='inline-block align-middle bg-white space-y-2 divide-y divide-gray-200 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg w-full sm:p-6'
            >
              <div className='space-y-8 divide-y divide-gray-200'>
                <div>
                  <div>
                    <h3 className='text-lg leading-6 font-medium text-gray-900'>Create Todo List</h3>
                    <p className='mt-1 text-sm text-gray-500'>Fill-up this form to create a new list</p>
                  </div>

                  <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                    <div className='col-span-6'>
                      <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
                        Name
                      </label>
                      <input
                        type='text'
                        {...register("name", { required: true })}
                        className='flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300'
                      />
                      {errors.name && <p className='text-red-500 text-sm'>List name is required.</p>}
                    </div>
                  </div>
                  <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
                    <div className='col-span-6'>
                      <label htmlFor='username' className='block text-sm font-medium text-gray-700'>
                        Tags
                      </label>
                      <input
                        type='text'
                        {...register("tags")}
                        className='flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300'
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-5 pt-2 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense'>
                <button
                  type='submit'
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm'
                >
                  Create
                </button>
                <button
                  type='button'
                  className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm'
                  onClick={() => onClose()}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

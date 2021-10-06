import { CheckCircleIcon, XIcon } from "@heroicons/react/solid";

export default function MessageBanner({ message }) {
  return (
    <div className='w-1/5 absolute bg-opacity-70 hover:bg-opacity-100 right-5 top-5 rounded-md shadow-md bg-emerald-600 p-4'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <CheckCircleIcon className='h-5 w-5 text-emerald-300' aria-hidden='true' />
        </div>
        <div className='ml-3'>
          <p className='text-sm font-medium text-emerald-200'>{message}</p>
        </div>
        <div className='ml-auto pl-3'>
          <div className='-mx-1.5 -my-1.5'>
            <button
              type='button'
              className='inline-flex rounded-md p-1.5 text-emerald-300 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-emerald-50 focus:ring-emerald-600'
            >
              <span className='sr-only'>Dismiss</span>
              <XIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

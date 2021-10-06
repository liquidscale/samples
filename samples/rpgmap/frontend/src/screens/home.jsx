import { useContext } from "react";
import { LQSContext } from "../client";
import { useImmer } from "use-immer";
import { Link } from "react-router-dom";

/**
 * Add simple auth support
 */
function AuthForm({ onAuth }) {
  const [form, updateForm] = useImmer({});

  const handleSubmit = e => {
    e.preventDefault();
    onAuth(form);
  };

  const updateIdentity = e => updateForm(draft => void (draft.identity = e.target.value));
  const updateColor = e => updateForm(draft => void (draft.color = e.target.value));

  return (
    <div className='max-w-7xl mx-auto md:shadow-xl md:rounded border border-sky-500 bg-sky-600 p-3'>
      <h1 className='text-xl md:text-3xl text-sky-200 font-bold pt-2'>Authentication</h1>
      <p className='mb-3 text-sm font-light pt-1 text-sky-200'>Please enter a nickname to identify yourself a color name for visual collaboration</p>
      <form className='bg-sky-700 border border-sky-500 text-sky-200 px-3 py-5 rounded gap-5' onSubmit={handleSubmit}>
        <div className='grid grid-cols-3 mb-3 border-b border-sky-500 pb-2'>
          <label className='text-sky-50 ml-3 mt-2 font-bold'>Nickname</label>
          <div className='col-span-2 mb-1'>
            <input className='bg-sky-100 w-full p-2 text-sky-700 rounded' onChange={updateIdentity} />
            <p className='text-xs font-light mt-3 text-sky-300'>Name used to identify yourself when collaborating</p>
          </div>
        </div>
        <div className='grid grid-cols-3 border-b border-sky-500 pb-2'>
          <label className='text-sky-50 ml-3 mt-2 font-bold'>Color</label>
          <div className='col-span-2 mb-1'>
            <input className='bg-sky-100 w-full p-2 text-sky-700 rounded' onChange={updateColor} />
            <p className='text-xs font-light mt-3 text-sky-300'>
              Any of the extended{" "}
              <a className='underline font-semibold' target='_blank' href='https://tailwindcss.com/docs/customizing-colors#color-palette-reference'>
                TailwindCSS color palette
              </a>{" "}
              values can be used (ex: blue-200)
            </p>
          </div>
        </div>
        <div className='flex mt-5 justify-end'>
          <button type='submit' className='bg-sky-500 hover:bg-sky-400 font-bold py-2 px-3 rounded text-sky-50'>
            Sign-In
          </button>
        </div>
      </form>
    </div>
  );
}

function Maps() {
  return (
    <div className='max-w-7xl mx-auto bg-sky-700 p-2 rounded shadow-lg border-2 border-sky-500'>
      <h1 className='text-xl md:text-3xl text-sky-200 font-bold pt-2'>Select a map</h1>
      <p className='mb-3 text-sm font-light pt-1 text-sky-200'>This sample supports 2 hardcoded maps. Click on the link below to use it. </p>
      <ul>
        <li className='flex gap-2'>
          <span className='font-bold text-sky-200'>Level 1</span>
          <Link className='text-sm underline' to={`/maps/level1/player`}>
            As Player
          </Link>
          <Link className='text-sm underline' to={`/maps/level1/gm`}>
            as GM
          </Link>
        </li>
        <li className='flex gap-2'>
          <span className='font-bold text-sky-200'>Level 2</span>
          <Link className='text-sm underline' to={`/maps/level2/player`}>
            As Player
          </Link>
          <Link className='text-sm underline' to={`/maps/level2/gm`}>
            as GM
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default function Home() {
  const { state, dispatch } = useContext(LQSContext);

  const onAuth = info => dispatch({ type: "set-identity", ...info });

  return (
    <div>
      {state.ui.error && <div className='md:max-w-3xl md:mx-auto my-5 md:shadow-xl md:rounded bg-pink-800 text-pink-100 p-2'>{state.ui.error}</div>}
      {state.local.identity ? <Maps /> : <AuthForm onAuth={onAuth} />}
    </div>
  );
}

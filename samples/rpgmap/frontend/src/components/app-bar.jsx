import { useContext } from "react";
import { useView, LQSContext } from "../client";

export default function AppBar() {
  const { state, perform, dispatch } = useContext(LQSContext);
  const { data: activeUsers } = useView("active-users");

  const handleLogout = () => {
    perform("update-presence", { status: "inactive", device: state.local.id, identity: state.local.identity }, function () {
      dispatch({ type: "logout" });
    });
  };

  return (
    <div className='flex justify-between static bg-blueGray-900 p-2 mb-5'>
      <h1 className='text-blueGray-200'>RPGMap Sample</h1>
      <div className='flex gap-x-1.5'>
        {activeUsers.map((user, idx) =>
          state.local.identity === user.identity ? (
            <button onClick={handleLogout} key={idx} className={`block h-8 w-8 text-center -mt-0.5 ring-2 ring-green-500 rounded-md text-black bg-${user.color}`}>
              {user.identity && user.identity.substring(0, 1).toUpperCase()}
            </button>
          ) : (
            <span key={idx} className={`block h-8 w-8 text-center -mt-0.5 rounded-md text-black bg-${user.color}`}>
              {user.identity && user.identity.substring(0, 1).toUpperCase()}
            </span>
          )
        )}
      </div>
    </div>
  );
}

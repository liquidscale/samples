import { applyPatches, enablePatches } from "immer";

enablePatches();

export default function reducer(state, action) {
  switch (action.type) {
    case "init":
      return action.state;
    case "connect":
      console.log("connected!");
      state.ui.socket = action.socket;
      break;
    case "disconnect":
      console.log("disconnected!");
      state.ui.socket = null;
      if (action.error) {
        state.ui.error = action.error;
      }
      break;
    case "sync":
      applyPatches(state, action.changes);
      break;
    case "set-identity":
      console.log("setting our identity", action);
      state.local.identity = action.identity;
      state.local.color = action.color;
      break;
    case "logout":
      state.local.identity = null;
      state.local.color = null;
      break;
    case "message":
      state.ui.message = action.message;
      break;
  }
}

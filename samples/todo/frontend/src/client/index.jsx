/**
 * NOTE: This will be moved to @liquidscale/react-client and reused in all apps.
 */
import { createContext, useEffect, useContext, useState } from "react";
import SocketIO from "socket.io-client";
import uniqid from "uniqid";
import { useImmerReducer } from "use-immer";
import reducer from "./reducer";

const LQSContext = createContext();
const LQSContextConsumer = LQSContext.Consumer;

function LQSContextProvider({ children, url }) {
  const [state, dispatch] = useImmerReducer(reducer, {
    local: JSON.parse(localStorage.getItem("lqs_app")) || {},
    ui: {
      loading: false,
      success: false,
      error: false,
      socket: null
    }
  });

  function perform(fn, payload, reply) {
    if (state.ui.socket) {
      state.ui.socket.emit("call-fn", { fn, payload }, reply);
    } else {
      //FIXME: use a Subject to queue perform function calls to execute them when socket is back! (socket will pull them)
      //FIXME: We should have opts with timeout in case socket never come back (or too late)
      //FIXME: We should also support opts.cancel when user navigates away and call should not be performed finally
      console.log("socket is not connected!");
    }
  }

  useEffect(() => {
    if (state.local.id) {
      console.log("connecting to the LQS WS gateway", url, state.local.id);
      const socket = SocketIO(url, { transports: ["websocket"] });

      let presenceTimer;

      socket.on("connect", function () {
        dispatch({ type: "connect", socket });
        presenceTimer = setInterval(function () {
          if (state.local.identity) {
            socket.emit("call-fn", { fn: "updatePresence", payload: { status: "active", device: state.local.id, identity: state.local.identity, color: state.local.color } });
          }
        }, 5000);
      });

      socket.on("reconnect", function () {
        console.log("reconnecting lqs socket");
        dispatch({ type: "connect", socket });
      });

      socket.on("disconnect", function () {
        console.log("socket is disconnected");
        dispatch({ type: "disconnect", socket });
        if (presenceTimer) {
          clearInterval(presenceTimer);
        }
      });

      socket.on("device:sync", function (changes) {
        dispatch({ type: "sync", changes });
      });
    }
  }, [url, state.local.id]);

  useEffect(() => {
    if (!state.local.id) {
      const local = {
        id: uniqid(),
        token: null,
        refreshToken: null,
        expirationTs: null
      };
      dispatch({
        type: "init",
        state: {
          local,
          ui: {
            loading: false,
            success: false,
            error: false,
            socket: null
          }
        }
      });
      localStorage.setItem("lqs_app", JSON.stringify(local));
    } else {
      localStorage.setItem("lqs_app", JSON.stringify(state.local));
    }
  }, [state.local]);

  return <LQSContext.Provider value={{ state, dispatch, perform }}>{children}</LQSContext.Provider>;
}

export { LQSContext, LQSContextConsumer, LQSContextProvider };

export function useView(name) {
  const { state: globalState, perform, dispatch } = useContext(LQSContext);
  const [state, syncState] = useState([]);

  useEffect(() => {
    let viewChannelId = null;

    function resultHandler({ type, result, ...event }) {
      if (type === "sync") {
        syncState(result);
      } else {
        console.log("received unsupported query event type", type, event);
      }
    }

    if (globalState.ui.socket) {
      globalState.ui.socket.emit("view", { device: globalState.local.id, name }, function (channelId) {
        viewChannelId = channelId;
        globalState.ui.socket.on(`channel:${channelId}`, resultHandler);
      });
    }

    return function () {
      if (viewChannelId && globalState.ui.socket) {
        globalState.ui.socket.emit(`channel:${viewChannelId}:close`, { id: viewChannelId }, function () {
          syncState(null);
        });
      } else {
        if (globalState.ui.socket) {
          console.log("removing socket listener for this scope");
          globalState.ui.socket.removeListener(resultHandler);
        } else {
          console.log("channel will not be closed", state);
        }
      }
    };
  }, [globalState.ui.socket, name]);

  return { data: state, ...globalState, perform, dispatch };
}

export function useScope(scope, id, { selector, query, sort, limit, skip } = {}) {
  const { state: globalState, perform, dispatch } = useContext(LQSContext);
  const [state, syncState] = useState();

  useEffect(() => {
    let scopeChannelId = null;
    function resultHandler({ type, result, ...event }) {
      if (type === "sync") {
        syncState(result);
      } else {
        console.log("unsupported scope event type", type, event);
      }
    }
    if (globalState.ui.socket) {
      globalState.ui.socket.emit("query", { device: globalState.local.id, scope: { key: scope, id }, selector, query, sort, limit, skip }, function (channelId) {
        scopeChannelId = channelId;
        globalState.ui.socket.on(`channel:${channelId}`, resultHandler);
      });
    } else {
      console.log("socket is not connected. unable to refresh scope");
    }

    return function () {
      if (scopeChannelId && globalState.ui.socket) {
        globalState.ui.socket.emit(`channel:${scopeChannelId}:close`, { device: globalState.local.id, id: scopeChannelId }, function () {
          console.log("scope %s:%s channel is closed", scope, id);
          syncState(null);
        });
      } else {
        if (globalState.ui.socket) {
          globalState.ui.socket.removeListener(resultHandler);
        } else {
          console.log("channel will not be closed", state);
        }
      }
    };
  }, [globalState.ui.socket, scope, id]);

  return { state, ...globalState, perform, dispatch };
}

export function useDevice() {
  const { state } = useContext(LQSContext);
  return { device: state.local };
}

import { useContext, Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./screens/home";
import TodoList from "./screens/todo-list";
import MessageBanner from "./components/message-banner";
import { LQSContext } from "./client";
import AppBar from "./components/app-bar";

export default function Routes() {
  const { state, dispatch } = useContext(LQSContext);

  useEffect(() => {
    if (state.ui.message) {
      setTimeout(function () {
        dispatch({ type: "message" });
      }, 3500);
    }
  }, [state.ui.message]);
  return (
    <Fragment>
      <AppBar />
      {state.ui.message && <MessageBanner message={state.ui.message} />}
      <Switch>
        <Route path='/lists/:id' component={TodoList} />
        <Route exact path='/' component={Home} />
      </Switch>
    </Fragment>
  );
}

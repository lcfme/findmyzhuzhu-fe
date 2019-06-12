import React, { Component, lazy, Suspense } from "react";
import {
  HashRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import * as AsyncComponent from "./components/AsyncComponent";
import Home from "./pages/Home";
const Login = lazy(() => import("./pages/Login"));

const App = props => {
  const WidthDefaultFallback = AsyncComponent.WidthDefaultFallback;
  return (
    <div className="find-my-zhuzhu">
      {React.createElement(
        WidthDefaultFallback(props => (
          <Router>
            <Switch>
              <Route path="/h" component={Home} />
              <Route path="/login" component={Login} />
              <Redirect to="/h" />
            </Switch>
          </Router>
        )),
        props
      )}
    </div>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {ContextProvider} from "./application.context";
import { NotFound } from "./pages/NotFound/NotFound";
import {PrivateRoute} from "./components/PrivateRoute/PrivateRoute";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import "antd/dist/antd.css";

const App = () => {

  return (
    <ContextProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ContextProvider>
  );
};

export default App;

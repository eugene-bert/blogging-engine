import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {ContextProvider} from "./application.context";
import { NotFound } from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import "antd/dist/antd.css";

const App = () => {

  return (
    <ContextProvider>
      <Router>
        <Switch>
          <Route path="/:type(|blog|profile|myArticles)" component={Home} />
          <Route path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </ContextProvider>
  );
};

export default App;

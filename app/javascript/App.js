import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import 'antd/dist/antd.css';


const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default App;

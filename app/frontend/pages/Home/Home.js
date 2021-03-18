import React from "react";
import { Route, Switch } from "react-router-dom";
import { useApplicationContext } from "../../application.context";
import { NotFound } from "../NotFound/NotFound";
import { Button } from "antd";
import "./Home.scss";

const Main = () => {
  const { dispatch } = useApplicationContext();
  return (
    <div>
      <Button
        onClick={() => {
          localStorage.clear();
          dispatch({ type: "LOG_OUT" });
        }}
      >
        Log out
      </Button>
    </div>
  );
};
const Home = () => {
  return (
    <div className="home-page">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Home;

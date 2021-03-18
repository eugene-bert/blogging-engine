import React from "react";
import { Route, Switch } from "react-router-dom";
import { useApplicationContext } from "../../application.context";
import MainDecorator from "../../components/MainDecorator/MainDecorator";
import { NotFound } from "../NotFound/NotFound";
import { Button } from "antd";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home-page">
      <Switch>
        <Route exact path="/" component={MainDecorator} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Home;

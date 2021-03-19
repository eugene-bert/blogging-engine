import React from "react";
import { Route, Switch } from "react-router-dom";
import MainDecorator from "../../components/MainDecorator/MainDecorator";
import { NotFound } from "../NotFound/NotFound";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home-page">
      <Switch>
        <Route exact path="/:type(|blog|profile|myArticles)" component={MainDecorator} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Home;

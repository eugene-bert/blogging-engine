import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Blog from "../Blog/Blog";
import ArticlesContainer from "../ArticlesContainer/ArticlesContainer";
import MyProfile from "../MyProfile/MyProfile";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import "./SectionsDecorator.scss";

const TestComponent = () => {
  return <Redirect to={{ pathname: "/blog" }} />;
};

const SectionsDecorator = () => {
  return (
    <div className="sections-decorator">
      <Switch>
        <Route path="/blog" component={Blog} />
        <PrivateRoute path="/myArticles" component={ArticlesContainer} />
        <PrivateRoute path="/profile" component={MyProfile} />
        <Route component={TestComponent} />
      </Switch>
    </div>
  );
};

export default SectionsDecorator;

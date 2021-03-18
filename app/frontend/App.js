import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import { NotFound } from "./pages/NotFound/NotFound";
import "antd/dist/antd.css";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route>
        <NotFound />
      </Route>
    </Router>
  );
};

export default App;

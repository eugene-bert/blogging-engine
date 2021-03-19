import React from "react";
import ReactDOM from "react-dom";
import App from "../App";

document.addEventListener("DOMContentLoaded", () => {
  const rootEl = document.createElement("div");
  rootEl.setAttribute('id', 'root');
  ReactDOM.render(
    <App />,
    document.body.appendChild(rootEl)
  );
});

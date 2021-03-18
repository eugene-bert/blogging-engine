import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import { useApplicationContext } from "../../application.context";
import {Redirect} from "react-router";
import "./Login.scss";

const Login = () => {
  const { state } = useApplicationContext();

  return (
    <div className="login-page">
      {state.isLoggedIn ? <Redirect to="/" /> : <LoginForm />}
    </div>
  );
};

export default Login;

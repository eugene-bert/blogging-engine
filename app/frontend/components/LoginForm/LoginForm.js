import React, { useState, Fragment } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { useApplicationContext } from "../../application.context";
import axios from "axios";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const LoginForm = () => {
  const [loginForm, setLoginForm] = useState(true);
  const { dispatch } = useApplicationContext();
  const onFinish = (values) => {
    if (loginForm) {
      axios
        .post("/api/v1/login", {
          username: values.username,
          password: values.password,
        })
        .then((data) => {
          console.log(data);
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("exp", data.data.exp);
          if (data.data.token) {
            dispatch({ type: "LOG_IN" });
          }
        });
    } else {
      axios
        .post("/api/v1/register", {
          username: values.username,
          password: values.password,
        })
        .then((data) => {
          console.log(data);
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("exp", data.data.exp);
          if (data.data.token) {
            dispatch({ type: "LOG_IN" });
          }
        });
    }
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          {loginForm ? (
            <Fragment>Login</Fragment>
          ) : (
            <Fragment>Register</Fragment>
          )}
        </Button>
      </Form.Item>
      {loginForm ? (
        <Fragment>
          Or{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setLoginForm(false);
            }}
          >
            {" "}
            register now!
          </a>
        </Fragment>
      ) : (
        <Fragment>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setLoginForm(true);
            }}
          >
            Login
          </a>
        </Fragment>
      )}
    </Form>
  );
};

export default LoginForm;

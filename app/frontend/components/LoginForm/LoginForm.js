import React, { useState, Fragment } from "react";
import { Form, Input, Button } from "antd";
import { useApplicationContext } from "../../application.context";
import { decodeToken } from "react-jwt";
import api from "../../api";

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
      return api
        .login({
          user_name: values.user_name,
          password: values.password,
        })
        .then((data) => {
          if (data.data.token) {
            localStorage.setItem("token", data.data.token);
            dispatch({
              type: "LOG_IN",
            });
          }
        });
    }
    return api
      .register({
        user_name: values.user_name,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
      })
      .then((data) => {
        if (data.data.token) {
          localStorage.setItem("token", data.data.token);
          dispatch({
            type: "LOG_IN",
          });
        }
      });
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
        name="user_name"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input placeholder="Please input your username" />
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
        <Input.Password placeholder="Please input your password here" />
      </Form.Item>
      {!loginForm && (
        <Fragment>
          <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
          >
            <Input.Password placeholder="Please confirm your password here" />
          </Form.Item>
          <Form.Item
            label="First name"
            name="first_name"
            rules={[
              {
                required: !loginForm && true,
                message: "Please input your first name!",
              },
            ]}
          >
            <Input placeholder="Please input your first name" />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="last_name"
            required={true}
            rules={[
              {
                required: !loginForm && true,
                message: "Please input last name!",
              },
            ]}
          >
            <Input placeholder="Please input your last name" />
          </Form.Item>
        </Fragment>
      )}
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

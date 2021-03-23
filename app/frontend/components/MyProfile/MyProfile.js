import React, { useState } from "react";
import { Form, Input, Typography } from "antd";
import { useApplicationContext } from "../../application.context";

const { Title } = Typography;

const MyProfile = () => {
  const { state } = useApplicationContext();
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="First name">
          <Input value={state.userInfo.first_name} />
        </Form.Item>
        <Form.Item label="Last name">
          <Input value={state.userInfo.last_name} />
        </Form.Item>
        <Form.Item label="Username">
          <Input value={state.userInfo.user_name} />
        </Form.Item>
      </Form>
    </>
  );
};

export default MyProfile;

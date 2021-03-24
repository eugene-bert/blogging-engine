import React, {Fragment, useState} from "react";
import { Form, Input, Button } from "antd";
import { useApplicationContext } from "../../application.context";
import "./MyProfile.scss";

const MyProfile = () => {
  const { state } = useApplicationContext();
  const [componentSize, setComponentSize] = useState("default");
  const [editMode, setEditMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <div className="my-profile">
      {!changePasswordMode && (
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
            {editMode ? (
              <Input defaultValue={state.userInfo.first_name} />
            ) : (
              state.userInfo.first_name
            )}
          </Form.Item>
          <Form.Item label="Last name">
            {editMode ? (
              <Input defaultValue={state.userInfo.last_name} />
            ) : (
              state.userInfo.last_name
            )}
          </Form.Item>
          <Form.Item label="Username">
            {editMode ? (
              <Input defaultValue={state.userInfo.user_name} />
            ) : (
              state.userInfo.user_name
            )}
          </Form.Item>
        </Form>
      )}
      <div className="my-profile__actions">
        {!changePasswordMode && (
            <Fragment>
              <Button onClick={() => setEditMode(true)}>Edit</Button>
              <Button onClick={() => setChangePasswordMode(true)}>
                Change Password
              </Button>
            </Fragment>
        )}
        {changePasswordMode && (
            <Fragment>
              <Button onClick={() => setChangePasswordMode(false)}>Cancel</Button>
              <Button>Save</Button>
            </Fragment>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

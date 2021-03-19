import React, { useState } from "react";
import { Drawer, Form, Button, Col, Row, Input, Select } from "antd";
import axios from "axios";
import { useApplicationContext } from "../../application.context";

export const CreateArticle = () => {
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const { dispatch } = useApplicationContext();
  const [form] = Form.useForm();

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Create new article
      </Button>
      <Drawer
        title="Create new article"
        width={720}
        onClose={() => setOpen(false)}
        visible={open}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              onClick={() => {
                setOpen(false);
                form.resetFields();
              }}
              style={{ marginRight: 8 }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                axios
                  .post(
                    "/api/v1/create_article",
                    { title: inputs.title, body: inputs.body },
                    {
                      headers: { Bearer: localStorage.getItem("token") },
                    }
                  )
                  .then((data) => {
                    console.log(data);
                    form.resetFields();
                    setOpen(false);
                    axios
                      .get("http://localhost:3000/api/v1/login/articles_list", {
                        headers: { Bearer: localStorage.getItem("token") },
                      })
                      .then((data) => {
                        dispatch({ type: "SET_ARTICLES", payload: data.data });
                      });
                  });
                console.log(inputs);
              }}
              type="primary"
            >
              Submit
            </Button>
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="Title"
                label="Title"
                rules={[{ required: true, message: "Please enter title" }]}
              >
                <Input
                  placeholder="Please enter title"
                  onChange={(e) => {
                    inputs.title = e.target.value;
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="Text"
                label="Text"
                rules={[
                  {
                    required: true,
                    message: "please enter article text",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  value={inputs.body}
                  placeholder="please enter article text"
                  onChange={(e) => {
                    inputs.body = e.target.value;
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

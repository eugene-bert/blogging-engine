import React from "react";
import { Input, Layout, Menu, Button, Form } from "antd";
import { BookOutlined, LogoutOutlined, ReadOutlined } from "@ant-design/icons";
import { useApplicationContext } from "../../application.context";
import { CreateArticle } from "../CreateArticle/CreateArticle";
import "./MainDecorator.scss";

const { Header, Content, Footer, Sider } = Layout;

const MainDecorator = () => {
  const { dispatch } = useApplicationContext();
  return (
    <div className="main-decorator">
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <div className="main-decorator__logo">
              <img src="/img/logo.png" alt="" />
            </div>
            <Menu.Item key="1" icon={<BookOutlined />}>
              Blog
            </Menu.Item>
            <Menu.Item key="2" icon={<ReadOutlined />}>
              Articles
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<LogoutOutlined />}
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "LOG_OUT" });
              }}
            >
              Sign out
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <div className="create-article">
                <div className="create-article__section">
                  <img
                    src="https://i.giphy.com/BferOKonYOspm28AiB.gif"
                    alt=""
                  />
                  <CreateArticle />
                </div>
                <div className="create-article__title">
                  <h1>WHY DO WE NEED TO BE CREATIVE?</h1>
                  <p>
                    Creativity is more than drawing a picture or strumming a
                    guitar. It’s a vital component to our overall well-being. If
                    we strive to take the right approach to find new ways to
                    express our creativity it not only will improve our personal
                    lives but our professional standing as well. The next time
                    you are in a museum staring at that masterpiece on the wall,
                    don’t consume yourself with thoughts of “I wish I could do
                    that.” Instead, focus on and appreciate what it took to
                    generate such brilliant work, and ask yourself what it is
                    that you can create.
                  </p>
                </div>
              </div>
              <div className="main-decorator__articles"></div>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Blogging Engine ©2021 Created by Mesmeric Ltd.
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainDecorator;

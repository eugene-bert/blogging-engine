import React, { Fragment } from "react";
import { Layout, Menu, Button} from "antd";
import { BookOutlined, UserOutlined, HddOutlined } from "@ant-design/icons";
import { useApplicationContext } from "../../application.context";
import { CreateArticle } from "../CreateArticle/CreateArticle";
import LogInModal from "../LogInModal/LogInModal";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import SectionsDecorator from "../SectionsDecorator/SectionsDecorator";
import "./MainDecorator.scss";
import api from "../../api";

const { Content, Footer, Sider } = Layout;

const LogOutButton = () => {
  const { dispatch } = useApplicationContext();

  return (
    <Button
      type="primary"
      className="login-button"
      onClick={() => {
        localStorage.clear();
        dispatch({ type: "LOG_OUT" });
      }}
    >
      Log out
    </Button>
  );
};

const MainDecorator = () => {
  const { state, dispatch } = useApplicationContext();
  let location = useLocation();

  React.useEffect(() => {
    api.getArticles().then((data) => {
      dispatch({ type: "SET_ALL_ARTICLES", payload: data.data });
    });

    if (state.isLoggedIn) {
      api.getUserInfo().then((data) => {
        dispatch({ type: "SET_USER_INFO", payload: data.data });
      });
    }
  }, [state.isLoggedIn]);

  const getDefaultSelectedKey = () => {
    switch (location.pathname) {
      case "/":
        return "1";
      case "/blog":
        return "1";
      case "/profile":
        return "2";
      case "/myArticles":
        return "3";
      default:
        return "1";
    }
  };

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
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[getDefaultSelectedKey()]}
          >
            <div className="main-decorator__logo">
              <img src="/img/logo.png" alt="" />
            </div>
            {state.isLoggedIn && (
              <div className="create-button">
                <CreateArticle />
              </div>
            )}
            <Menu.Item key="1" icon={<BookOutlined />}>
              <Link to="/blog">Blog</Link>
            </Menu.Item>
            {state.isLoggedIn && (
              <Fragment>
                <Menu.Item isSelected={true} key="2" icon={<UserOutlined />}>
                  <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item isSelected={true} key="3" icon={<HddOutlined />}>
                  <Link to="/myArticles">My articles</Link>
                </Menu.Item>
              </Fragment>
            )}
            {!state.isLoggedIn ? <LogInModal /> : <LogOutButton />}
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
                    {state.isLoggedIn ? <CreateArticle /> : <LogInModal />}
                  </div>
                  <div className="create-article__title">
                    <h1>WHY DO WE NEED TO BE CREATIVE?</h1>
                    <p>
                      Creativity is more than drawing a picture or strumming a
                      guitar. It’s a vital component to our overall well-being.
                      If we strive to take the right approach to find new ways
                      to express our creativity it not only will improve our
                      personal lives but our professional standing as well. The
                      next time you are in a museum staring at that masterpiece
                      on the wall, don’t consume yourself with thoughts of “I
                      wish I could do that.” Instead, focus on and appreciate
                      what it took to generate such brilliant work, and ask
                      yourself what it is that you can create.
                    </p>
                  </div>
                </div>
              <SectionsDecorator />
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

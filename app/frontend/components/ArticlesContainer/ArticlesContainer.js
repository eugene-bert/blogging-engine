import React from "react";
import { Card } from "antd";
import axios from "axios";
import uuid from "react-uuid";
import { useApplicationContext } from "../../application.context";
import { Collapse, Tooltip, Button } from "antd";
import {EditOutlined} from "@ant-design/icons";
import './ArticlesContainer.scss';

const { Panel } = Collapse;

const ArticlesContainer = () => {
  const { state, dispatch } = useApplicationContext();

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/login/articles_list", {
        headers: { Bearer: localStorage.getItem("token") },
      })
      .then((data) => {
        dispatch({ type: "SET_ARTICLES", payload: data.data });
      });
  }, []);

  return state.articles.length > 0 && (
    <div className="articles-container">
      <Card title="My articles">
        <Collapse defaultActiveKey={['1']} bordered={false}>
          {state.articles.map((article, index) => {
            return (
              <Panel
                key={!(index === 0) ? uuid() : 1}
                header={article.title}
              >
                {article.body}
                  <Tooltip title="Edit">
                      <Button className="articles-container__edit" type="primary" shape="circle" icon={<EditOutlined />} />
                  </Tooltip>
              </Panel>
            );
          })}
        </Collapse>
      </Card>
    </div>
  );
};

export default ArticlesContainer;

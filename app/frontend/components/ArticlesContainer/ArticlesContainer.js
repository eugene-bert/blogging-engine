import React, { Fragment } from "react";
import {Divider, Typography} from "antd";
import uuid from "react-uuid";
import { useApplicationContext } from "../../application.context";
import "./ArticlesContainer.scss";

const { Title } = Typography;


const ArticlesContainer = () => {
  const { state } = useApplicationContext();

  return (
    state.userArticles.length > 0 && (
      <div className="articles-container">
          <Title>My articles</Title>
        {state.userArticles.map((article, index) => {
          return (
            <Fragment key={uuid()}>
              <Divider orientation="left" plain>
                <h3>{article.title}</h3>
              </Divider>
              <p>{article.body}</p>
            </Fragment>
          );
        })}
      </div>
    )
  );
};

export default ArticlesContainer;

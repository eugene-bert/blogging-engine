import React from "react";
import uuid from "react-uuid";
import { useApplicationContext } from "../../application.context";
import Article from "../Article/Article";
import "./MyArticlesContainer.scss";

const MyArticlesContainer = () => {
  const { state } = useApplicationContext();

  const userArticles = state.articles.filter(
    (article) => state.userInfo.id === article.user_id
  );

  return (
    userArticles.length > 0 && (
      <div className="blog">
        {userArticles.map((article) => {
          return (
            <Article
              isAdmin={state.userInfo.id === article.user_id}
              key={uuid()}
              article={article}
            />
          );
        })}
      </div>
    )
  );
};

export default MyArticlesContainer;

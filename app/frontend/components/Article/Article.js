import React from "react";
import { Divider } from "antd";
import { Comment, Avatar } from "antd";
import ArticleModal from "../ArticleModal/ArticleModal";
import './Article.scss';

const Article = ({ article }) => {
  return (
    <Comment
    actions={[<ArticleModal article={article} className="article-view" />]}
    author={<a className="article-author">{article.first_name} {article.last_name}</a>}
    content={
        <>
            <Divider orientation="left" plain>
                <h3 className="article-title">{article.title}</h3>
            </Divider>
            <p>{article.body.slice(0, 300)}{article.body.length >= 300 && '...'}</p>
        </>
    }
    />
  );
};

export default Article;

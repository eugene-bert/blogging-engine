import React from "react";
import { Divider } from "antd";
import { Comment } from "antd";
import ArticleModal from "../ArticleModal/ArticleModal";
import './Article.scss';
import moment from "moment";

const Article = ({ article, isAdmin }) => {

  return (
    <Comment
    actions={[<ArticleModal isAdmin={isAdmin} article={article} className="article-view" />]}
    author={<a className="article-author">{article.first_name} {article.last_name}</a>}
    className={`article ${isAdmin ? 'article__admin' : ''}`}
    content={
        <>
            <Divider orientation="center" plain>
                <h3 className="article-title">{article.title}</h3>
            </Divider>
            <p>{article.body.slice(0, 300)}{article.body.length >= 300 && '...'}</p>
            <p className="article-date">{moment(article.created_at).fromNow()}</p>
        </>
    }
    />
  );
};

export default Article;

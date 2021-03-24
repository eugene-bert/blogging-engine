import React from "react";
import uuid from "react-uuid";
import {useApplicationContext} from "../../application.context";
import Article from "../Article/Article";


const Blog = () => {
    const { state } = useApplicationContext();

    return state.articles.length > 0 && (
        <div className="blog">
            {state.articles.map(article => {
                return (
                    <Article isAdmin={state.userInfo.id === article.user_id} key={uuid()} article={article} />
                )
            })}


        </div>
    )
}

export default Blog;
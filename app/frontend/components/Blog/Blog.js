import React from "react";
import uuid from "react-uuid";
import {useApplicationContext} from "../../application.context";
import Article from "../Article/Article";
import { Typography} from "antd";


const Blog = () => {
    const { state } = useApplicationContext();

    return state.articles.length > 0 && (
        <div className="blog">
            {state.articles.map(article => {
                return (
                    <Article key={uuid()} article={article} />
                )
            })}


        </div>
    )
}

export default Blog;
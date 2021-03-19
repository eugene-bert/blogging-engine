import React from "react";
import {Route, Switch} from "react-router-dom";
import Blog from "../Blog/Blog";
import ArticlesContainer from "../ArticlesContainer/ArticlesContainer";
import MyProfile from "../MyProfile/MyProfile";
import './SectionsDecorator.scss'

const TestComponent = () => {
    return <div>Test</div>;
};

const SectionsDecorator = () => {
    return (
        <div className="sections-decorator">
            <Switch>
                <Route path="/blog" component={Blog} />
                <Route path="/myArticles" component={ArticlesContainer} />
                <Route path="/profile" component={MyProfile} />
                <Route component={TestComponent} />
            </Switch>
        </div>
    )
}


export default SectionsDecorator;
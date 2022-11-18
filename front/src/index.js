import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import './index.css';

// pages
import MyBlog from "./pages/MyBlog";
import WritePostPage from "./pages/WritePostPage"
import reportWebVitals from './reportWebVitals';


import { BrowserRouter, Route, BrowserRouter as Router, Routes, Switch } from "react-router-dom";
import Post from "./gain/Post.js";
import PostList from "./gain/PostList";
import Index from "./gain/Index.js";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
   {/* <App /> */}
   <BrowserRouter>
    <Switch>
          <Route path="/index" render={(props) => <Index {...props} />} />
           {/* post 조회 */}
           <Route path="/post" render={(props) => <PostList {...props} />} />
           <Route path="/post-detail/:id" render={(props) => <Post {...props} />} />
           <Route path="/myblog" render={(props) => <MyBlog {...props} />} />
          <Route path='/create-post' component={WritePostPage}></Route>
          <Redirect to="/myblog"/>
     </Switch>
   </BrowserRouter>
  </>
);



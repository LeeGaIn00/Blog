import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
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
     
     </Switch>
   </BrowserRouter>
  </>
);



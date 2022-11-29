import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import './index.css';

// pages
import MyBlog from "./pages/MyBlog";
import WritePostPage from "./pages/WritePostPage"
import reportWebVitals from './reportWebVitals';

import Post from "./pages/Post.js";
import Index from "./pages/Index.js";
import Register from './pages/Register.js';
import Login from './pages/Login.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
   {/* <App /> */}
   <BrowserRouter>
    <Switch>
          <Route path="/index" render={(props) => <Index {...props} />} />
          <Route path="/post-detail/:no" render={(props) => <Post {...props} />} />
          <Route path="/myblog/:id" render={(props) => <MyBlog {...props} />} />
          <Route path='/create-post/:no' component={WritePostPage}></Route>
          <Route path='/register' render={(props) => <Register {...props} />} />
          <Route path='/login' render={(props) => <Login {...props} />} />
     </Switch>
   </BrowserRouter>
  </>
);



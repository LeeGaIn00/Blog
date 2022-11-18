import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import './index.css';

// pages
import MyBlog from "./pages/MyBlog";
import WritePostPage from "./pages/WritePostPage"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
   <BrowserRouter>
    <Switch>
        <Route path="/myblog" render={(props) => <MyBlog {...props} />} />
        <Route path='/create-post' component={WritePostPage}></Route>
        <Redirect to="/myblog"/>
     </Switch>
   </BrowserRouter>
  </>
);



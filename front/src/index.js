import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import './index.css';

// pages
import MyBlog from "./pages/MyBlog";
import WritePostPage from "./pages/WritePostPage"

import Post from "./pages/Post.js";
import Index from "./pages/Index.js";
import Register from './pages/Register.js';
import Login from './pages/Login.js';

// service
import { AuthContextProvider } from './service/AuthContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
   <AuthContextProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
   </AuthContextProvider>
  </>
);



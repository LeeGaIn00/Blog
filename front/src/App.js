import React, { useContext } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';

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
import AuthContext from './service/AuthContext';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Switch>
      <Route path="/index" render={(props) => <Index {...props} />} />
      <Route path="/post-detail/:no" render={(props) => <Post {...props} />} />
      <Route path="/myblog/:id" render={(props) => <MyBlog {...props} />} />
      {/* <Route path='/create-post/:no' component={WritePostPage} /> */}
      <Route path='/create-post/:no' render={(props) => authCtx.isLoggedIn ? <WritePostPage {...props}/> : < Index {...props} />} />
      <Route path='/register' render={(props) => authCtx.isLoggedIn ? < Index {...props} /> : <Register {...props} />} />
      <Route path='/login' render={(props) => authCtx.isLoggedIn ? < Index {...props} /> : <Login {...props}/> } />
      <Redirect to="/index" />
    </Switch>
  );
}

export default App;

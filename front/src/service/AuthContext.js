import React, { useState, useEffect, useCallback } from "react";
import authService from './AuthService'; 

const AuthContext = React.createContext({
  token: '',
  userId: '',
  isLoggedIn: false,
  isSuccess: false,
  isGetSuccess: false,
  signup: (member) =>  {},
  login: (id, password) => {},
  logout: () => {},
  getUser: () => {}
});

export const AuthContextProvider = ({ children }) => {

  const tokenData = authService.retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = !tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState('');
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGetSuccess, setIsGetSuccess ] = useState(false);

  const userIsLoggedIn = !!token;
  var logoutTimer;
  
  const signupHandler = (member) => {
    setIsSuccess(false);
    const response = authService.signupActionHandler(member);
    response.then((res) => {
      if (res && !res.data.error) {
        setIsSuccess(true);
      }
    });
  }

  const loginHandler = (id, password) => {
    setIsSuccess(false);
    console.log(isSuccess);
    
    const data = authService.loginActionHandler(id, password);
    data.then((res) => {
      if (res && !res.data.error) {
        const loginData = res.data;
        setToken(loginData.accessToken);
        logoutTimer = setTimeout(
          logoutHandler,
          authService.loginTokenHandler(loginData.accessToken, loginData.tokenExpiresIn)
        );
        setIsSuccess(true);
        console.log(isSuccess);
      }
    })
  };

  const logoutHandler = useCallback(() => {
    setToken('');
    authService.logoutActionHandler();
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const getUserHandler = () => {
    setIsGetSuccess(false);
    const data = authService.getUserActionHandler(token);
    data.then((res) => {
      if (res && !res.data.error) {
        console.log('get user start!');
        setUserId(res.data.id);
        setIsGetSuccess(true);
      }
    })    
  };

  useEffect(() => {
    console.log("useEffect => " + isSuccess);
  }, [isSuccess]);


  useEffect(() => {
    if(tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);


  const contextValue = {
    token,
    userId,
    isLoggedIn: userIsLoggedIn,
    isSuccess,
    isGetSuccess,
    signup: signupHandler,
    login: loginHandler,
    logout: logoutHandler,
    getUser: getUserHandler
  }
  
  return(
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
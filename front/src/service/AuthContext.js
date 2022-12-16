import React, { useState, useEffect, useCallback } from "react";
import authService from './AuthService'; 

const AuthContext = React.createContext({
  token: '',
  // userId: '',
  user: {},
  isLoggedIn: false,
  isSuccess: false,
  isGetSuccess: false,
  signup: (member) =>  {},
  login: (id, password) => {},
  logout: () => {},
  getUser: () => {},
  changeProfile: (profile) => {},
  changePassword: (exPassword, newPassword) => {}
});

export const AuthContextProvider = ({ children }) => {
  const tokenData = authService.retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  // const [userId, setUserId] = useState('');
  const [user, setUser] = useState({});
  
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
      }
    }).catch((err) => {alert("아이디 또는 비밀번호를 확인해주세요");});
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
        // setUserId(res.data.id);
        setUser(res.data);
        setIsGetSuccess(true);
      }
    })    
  };

  const changeProfileHandler = (newProfile) => {
    setIsSuccess(false);

    const data = authService.changeProfileActionHandler(user.profile, newProfile, token);
    data.then((res) => {
      if (res && !res.data.error) {
        setIsSuccess(true);
      } else {
        console.log(res);
      }
    }).catch((err) => {alert("프로필 변경에 실패하였습니다");});
  };

  const changePasswordHandler = (exPassword, newPassword) => {
    setIsSuccess(false);
    const data = authService.changePasswordActionHandler(exPassword, newPassword, token);
    data.then((res) => {
      if (res && !res.data.error) {
        setIsSuccess(true);
      } else {
        console.log(res);
      }
    }).catch((err) => {alert("비밀번호가 맞지 않습니다");});
  };

  useEffect(() => {
    if(tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token,
    // userId,
    user,
    isLoggedIn : userIsLoggedIn,
    isSuccess,
    isGetSuccess,
    signup: signupHandler,
    login: loginHandler,
    logout: logoutHandler,
    getUser: getUserHandler,
    changeProfile: changeProfileHandler,
    changePassword: changePasswordHandler
  }
  
  return(
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
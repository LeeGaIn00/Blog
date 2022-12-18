import React, { useState, useContext, useEffect, useRef } from 'react';

// reactstrap components
import { Button, Card, Form, Input } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFingerprint, faLock } from '@fortawesome/free-solid-svg-icons';

// styles
import '../assets/scss/login.scss';

// service
import AuthContext from "../service/AuthContext";

const Login = (props) => {
  const authCtx = useContext(AuthContext);
  const isSuccess = authCtx.isSuccess;
  const firstUpdate = useRef(true);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  /* 아이디 입력 */
  const setIdHandler = (e) => {
    setId(e.target.value);
  }

  /* 비밀번호 입력 */
  const setPasswordHandler = (e) => {
    setPassword(e.target.value);
  }

  const login = async () => {
    let member = {
      id: id,
      password:password
    };

    authCtx.login(id, password);
  }

  useEffect(() => {
    if (firstUpdate.current) {
        firstUpdate.current = false;
    }
    else {
        if (isSuccess) {
          props.history.push("/index");
        }
    }
  }, [isSuccess]);

  return (
    <div className="login-main">
        <div className="ml-auto mr-auto">
          <Card className="card-register login ml-auto mr-auto" style={{ backgroundColor: "white" }}>
            <h3 className="login-title">LOGIN</h3>
            <Form className="register-form">
              {/* 아이디 입력 */}
              <div className="login-group">
                <span className="login-icon"> <FontAwesomeIcon icon={faFingerprint} /> </span>
                <Input className='input-login' placeholder="ID" type="text" id="userId" onChange={setIdHandler} />
              </div>
              {/* 비밀번호 입력 */}
              <div className="login-group">
                <span className="login-icon"> <FontAwesomeIcon icon={faLock} /> </span>
                <Input className='input-login' placeholder="Password" type="password" id="password" onChange={setPasswordHandler} />
              </div>
              {/* 로그인 버튼 */}
              <Button 
                block 
                className="login-btn" 
                onClick={login}
              >
                LOGIN
              </Button>
            </Form>
            <div className="otherbtns" >
              {/* 회원가입 */}
              <Button
                block
                className="signup-btn"
                href="/register"
                onClick={(e) => window.location.href = "/register"}
              >
                SIGN UP
              </Button>
            </div>
          </Card>
        </div>
      </div>
  );
};

export default Login;
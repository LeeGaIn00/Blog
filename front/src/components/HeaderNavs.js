import React, { useContext, useEffect, useState } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { useLocation } from 'react-router-dom';

// styles
import "../assets/scss/header.scss";

import AuthContext from '../service/AuthContext';

function HeaderNavs(props) {
    const authCtx = useContext(AuthContext);
    const curPath = useLocation().pathname;
    const [id, setId] = useState('');
    let isLogin = authCtx.isLoggedIn;
    let isGet = authCtx.isGetSuccess;

    const callback = (str) => {
        setId(str);
    };

    useEffect(() => {
        if (isLogin) {
            authCtx.getUser();
        }
    }, [isLogin]);
    
    useEffect(() => {
        if (isGet) {
            callback(authCtx.userId);
        }
    }, [isGet]);

    const toggleLogoutHandler = () => {
        authCtx.logout();
        alert("로그아웃 되었습니다");
    };

    return (
        <div className='hdr-main'>
            <Nav className="justify-content-end">
                {curPath !== "/index" &&
                    <NavItem>
                        <NavLink
                        href="/index"
                        >
                        메인홈
                        </NavLink>
                    </NavItem>
                }
                {!isLogin && 
                    <NavItem>
                        <NavLink
                            href="/register"
                        >
                        회원가입
                        </NavLink>
                    </NavItem>
                }
                {!isLogin &&
                    <NavItem>
                        <NavLink
                            href="/login"
                        >
                        로그인
                        </NavLink>
                    </NavItem>
                }
                {(isLogin && curPath !== `/myblog/${id}`) &&
                    <NavItem>
                        <NavLink
                            href={`/myblog/${id}`}
                        >
                        내 블로그
                        </NavLink>
                    </NavItem>
                }
                {isLogin &&
                    <NavItem>
                        <NavLink
                            onClick={toggleLogoutHandler}
                        >
                        로그아웃
                        </NavLink>
                    </NavItem>
                }
                {(isLogin && curPath !== `/mypage/${id}`) &&
                    <NavItem>
                        <NavLink
                            href={`/mypage/${id}`}
                        >
                        마이페이지
                        </NavLink>
                    </NavItem>
                }
            </Nav>
        </div>
    );
}

export default HeaderNavs;
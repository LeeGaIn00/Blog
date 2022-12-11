import React, { useContext, useEffect, useState } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

import AuthContext from '../service/AuthContext'

function HeaderNavs(props) {
    const authCtx = useContext(AuthContext);
    const [id, setId] = useState('');
    let isLogin = authCtx.isLoggedIn;
    let isGet = authCtx.isGetSuccess;

    const callback = (str) => {
        setId(str);
    };

    useEffect(() => {
        if (isLogin) {
            console.log('start');
            authCtx.getUser();
        } 
    }, [isLogin]);
    
    useEffect(() => {
        if (isGet) {
            console.log('get start');
            callback(authCtx.userId);
        }
    }, [isGet]);

    const toggleLogoutHandler = () => {
        authCtx.logout();
    };
    
    return (
        <div>
            <Nav className="justify-content-end">
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
                {isLogin &&
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
                            href="/login"
                        >
                        로그아웃
                        </NavLink>
                    </NavItem>
                }
            </Nav>
        </div>
    );
}

export default HeaderNavs;
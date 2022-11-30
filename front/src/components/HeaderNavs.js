import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

function HeaderNavs(props) {
    return (
        <div>
            <Nav className="justify-content-end">
                <NavItem>
                    <NavLink
                    href="/register"
                    >
                    회원가입
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    href="/login"
                    >
                    로그인
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    );
}

export default HeaderNavs;
import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

function HeaderNavs(props) {
    return (
        <div>
            <Nav className="justify-content-end">
                <NavItem>
                    <NavLink
                    href="#"
                    >
                    내 블로그
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                    href="#"
                    >
                    로그아웃
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
    );
}

export default HeaderNavs;
import React from 'react';

import HeaderNavs from "./HeaderNavs";

function MyBlogHeader(props) {
    return (
        <div style={{
            borderBottom: "1px solid #aaa",
          }}>
            <HeaderNavs/>
            <div>
                누구누구의 블로그
            </div>
        </div>
    );
}

export default MyBlogHeader;
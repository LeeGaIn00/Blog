import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// styles
import "../assets/scss/header.scss";

// components
import HeaderNavs from "./HeaderNavs";

// service
import MemberService from '../service/MemberService';


function MyBlogHeader(props) {
    const [img, setImg] = useState();
    const [id, setId] = useState();
    const history = useHistory();

    useEffect(() => {
        MemberService.getProfile(props.id).then((res) => {
            // setImg(require(`/public/img/${res.data}`));
            setImg(`${process.env.PUBLIC_URL}/img/${res.data}`);
        })

        setId(props.id);
    }, []);

    const moveToMain = () => {
        history.push(`/blog/${id}`);
    };

    return (
        <div className='hdr-main'
            style={{
                borderBottom: "1px solid #aaa",
            }}>
            <HeaderNavs/>
            <div className="hdr-wrap">
                <span onClick={moveToMain}>
                    <img
                        className="profile"
                        alt="profile"
                        src={img}
                    />
                </span>
                <span onClick={moveToMain}>{id}의 블로그</span>
            </div>
        </div>
    );
}

export default MyBlogHeader;
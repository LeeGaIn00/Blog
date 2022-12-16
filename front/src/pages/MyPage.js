import React, { useContext, useEffect, useState } from "react";

import { Button,  Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faHeart, faCartShopping, faPenToSquare, faPencil } from '@fortawesome/free-solid-svg-icons'

// style
import '../assets/scss/mypage.scss';

// components
import HeaderNavs from "../components/HeaderNavs";

import AuthContext from '../service/AuthContext';

/* 마이페이지 */
const MyPage = (props) => {
    // const id = props.match.params.id;
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        authCtx.getUser();
    }, []);

    return (
        <div className="mypage-body">
            <HeaderNavs id={authCtx.user.id} />
            <div className="section mypage">
                <Container className="mypage-container">
                    <Row>
                        <Col className="mypage-info">
                            <div className="info-top">   
                                <img
                                    className="mypage-profile"
                                    alt="profile"
                                    src={`${process.env.PUBLIC_URL}/img/${authCtx.user.profile}`}/>
                                <span> {authCtx.user.name} </span>  
                            </div>
                            <div className="info-text">
                                <div className="info-group"> 아이디: {authCtx.user.id} </div>
                                <div className="info-group"> 이메일: {authCtx.user.email} </div>
                                <div className="info-group"> 전화번호: {authCtx.user.phone} </div>
                            </div>
                            {/* 회원정보 변경 */}
                            <Col className="mypage-order">
                                <div onClick={() => window.location.href = "/edit-profile"}> <FontAwesomeIcon icon={faPencil} /> 프로필 사진 변경 </div>
                            </Col>
                            <Col className="mypage-order">
                                <div onClick={() => window.location.href = "/edit-password"}> <FontAwesomeIcon icon={faPencil} /> 비밀번호 변경 </div>
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default MyPage;
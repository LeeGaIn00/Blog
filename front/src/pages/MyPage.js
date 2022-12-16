import React, { useContext, useEffect, useState } from "react";

import { Button,  Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faHeart, faCartShopping, faPenToSquare, faPencil } from '@fortawesome/free-solid-svg-icons'

// style
import '../assets/scss/mypage.scss';

// components
import HeaderNavs from "../components/HeaderNavs";

// service
import MemberService from "../service/MemberService";

import AuthContext from '../service/AuthContext';

/* 마이페이지 */
const MyPage = (props) => {
    const [user, setUser] = useState({});
    const id = props.match.params.id;

    useEffect(() => {
        MemberService.getOneMember(id).then(res => {
            setUser(res.data);
            console.log(res.data);
        })
    }, []);

    return (
        <>
            <HeaderNavs id={id} />
            <div className="section mypage">
                <Container className="mypage-container">
                    <Row>
                        <Col className="mypage-info">
                            <div className="info-top">   
                                <img
                                    className="mypage-profile"
                                    alt="profile"
                                    src={`${process.env.PUBLIC_URL}/${user.profile}`}/>
                                <span> {user.name} </span>  
                            </div>
                            <div className="info-text">
                                <div className="info-group"> 아이디: {user.id} </div>
                                <div className="info-group"> 이메일: {user.email} </div>
                                <div className="info-group"> 전화번호: {user.phone} </div>
                            </div>
                            {/* 회원정보 변경 */}
                            <Col className="mypage-order">
                                <div onClick={() => window.location.href = `/edit-info/${id}`}> <FontAwesomeIcon icon={faPencil} /> 회원정보 변경 </div>
                            </Col>
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    );
}

export default MyPage;
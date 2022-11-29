import React, { Component } from "react";
import { Button, Card, Form, Input, Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFingerprint, faLock, faEnvelope, faPhone, faHouse, faCakeCandles } from '@fortawesome/free-solid-svg-icons'

// styles
import "../assets/scss/register.scss"

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            email: '',
            password: '',
            name: '',
            phone: ''
        }
    }

    componentDidMount(){
        this.setState({
            phone: "010-"
        })
    }

    /* 이름 입력 */
    setNameHandler = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    /* 아이디 입력 */
    setIdHandler = (e) => {
        this.setState({
            id: e.target.value
        });
    }

    /* 비밀번호 입력 */
    setPasswordHandler = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    /* 이메일 입력 */
    setEmailHandler = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    /* 전화번호 입력 */
    setPhoneHandler = (e) => {
        this.setState({
            phone: e.target.value
        });
    }

    /* 비밀번호 유효성 검사 */
    checkPassword = (password) => {
        const regExp = /(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}/g;
        if (regExp.test(password))
            return true;
        else
            return false;
    }

    render() {
        return (
            <>
                <div className="register-wrapper">
                    <div className="register-main">
                        <div className="filter" />
                        <Container>
                            <Row>
                                <Col className="ml-auto mr-auto">
                                    <Card className="card-register register ml-auto mr-auto" style={{ backgroundColor: "white" }}>
                                        <h3 className="register-title">REGISTER</h3>
                                        <Form className="register-form">
                                            {/* 이름 입력 */}
                                            <div className="register-group" id='bottom-name'>
                                                <span className="register-icon"> <FontAwesomeIcon icon={faUser} /> <text>이름</text> </span>
                                                <Input className='input-register' placeholder="Name" type="text" id="name" onChange={this.setNameHandler} />
                                            </div>
                                            <UncontrolledTooltip placement="top" target="bottom-name" delay={0}>
                                            2자 이상 16자 이하로 입력하시오
                                            </UncontrolledTooltip>
                                            {/* 아이디 입력 */}
                                            <div className="register-group" id='bottom-id'>
                                                <span className="register-icon"> <FontAwesomeIcon icon={faFingerprint} /> <text>아이디</text> </span>
                                                <Input className='input-register' placeholder="ID" type="text" id="id" onChange={this.setIdHandler} />
                                            </div>
                                            <UncontrolledTooltip placement="top" target="bottom-id" delay={0}>
                                            4자 이상 12자 이하로 입력하시오
                                            </UncontrolledTooltip>
                                            {/* 비밀번호 입력 */}
                                            <div className="register-group" id='bottom-password'>
                                                <span className="register-icon"> <FontAwesomeIcon icon={faLock} /> <text>비밀번호</text> </span>
                                                <Input className='input-register' placeholder="Password" type="password" id="password" onChange={this.setPasswordHandler} />
                                            </div>
                                            <UncontrolledTooltip placement="top" target="bottom-password" delay={0} style={{ width: "200px" }}>
                                                영문, 숫자, 특수문자(!@#$%^&*)를 조합하여 8-20자로 입력하시오
                                            </UncontrolledTooltip>
                                            {/* 이메일 입력 */}
                                            <div className="register-group" id='bottom-email'>
                                                <span className="register-icon"> <FontAwesomeIcon icon={faEnvelope} /> <text>이메일</text> </span>
                                                <Input className='input-register' placeholder="Email" type="email" id="username"  onChange={this.setEmailHandler} />
                                            </div>
                                            <UncontrolledTooltip placement="top" target="bottom-email" delay={0}>
                                            @을 포함한 이메일을 입력하시오
                                            </UncontrolledTooltip>
                                            {/* 전화번호 입력 */}
                                            <div className="register-group" id='bottom-phone'>
                                                <span className="register-icon"> <FontAwesomeIcon icon={faPhone} /> <text>전화번호</text> </span>
                                                <Input className='input-register' placeholder="Phone" type="text" id="phone" value={this.state.phone} onChange={this.setPhoneHandler} />
                                            </div>
                                            <UncontrolledTooltip placement="top" target="bottom-phone" delay={0}>
                                            -을 포함한 전화번호를 입력하시오
                                            </UncontrolledTooltip>
                                            {/* 회원가입 완료 버튼 */}
                                            <Button block className="register-btn" type='button' onClick={() => {
                                                let memberDto = {
                                                    id: this.state.id,
                                                    password: this.state.password,
                                                    phone: this.state.phone
                                                };
                                                /* 회원정보 유효성 검사 */
                                                if (memberDto.id == '')
                                                    alert("아이디를 입력하세요.");
                                                else if (memberDto.password == '')
                                                    alert("비밀번호를 입력하세요.");
                                                else if (!this.checkPassword(memberDto.password))
                                                    alert("비밀번호를 올바르게 입력하세요.");
                                                else if (memberDto.phone == '') 
                                                    alert("전화번호를 입력하세요.");
                                            
                                            }}>
                                                확인
                                            </Button>
                                        </Form>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </>
        );
    }
}

export default Register;
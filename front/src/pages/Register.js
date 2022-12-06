import React, { Component } from "react";
import { Button, Card, Form, Input, Container, Row, Col, UncontrolledTooltip, FormFeedback, FormGroup, Label } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFingerprint, faLock, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

// styles
import "../assets/scss/register.scss"

// service
import MemberService from "../service/MemberService";


// regular expressions for fields
const idRegEx = /^.{4,16}$/;
const pwdRegEx = /(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}$/;
const nameRegEx = /^.{2,16}$/;
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const phoneRegEx = /^\d{2,3}-\d{3,4}-\d{4}$/;
const spaceRegEx = /\s/g;

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            lastId: '',
            email: '',
            lastEmail: '',
            password: '',
            name: '',
            phone: '',
            idValid: {stat : '', msg: ''},
            emailValid: {stat : '', msg: ''},
            passwordValid: {stat : '', msg: ''},
            nameValid: {stat : '', msg: ''},
            phoneValid: {stat : '', msg: ''}
        }
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
                                            {/* 아이디 입력 */}
                                            <FormGroup>
                                                <div className="register-group" id='bottom-id'>
                                                    <Row>
                                                        <Label className="register-icon"> 
                                                            <FontAwesomeIcon icon={faFingerprint} /> 아이디 
                                                        </Label>
                                                    </Row>
                                                    <Row>
                                                    <Col xs="9">
                                                        <Input 
                                                            className='input-register' 
                                                            placeholder="ID" 
                                                            id="id" 
                                                            onChange={this.setIdHandler} 
                                                            valid={this.state.idValid.stat === "success"}
                                                            invalid={this.state.idValid.stat === "error"} 
                                                        />
                                                        <FormFeedback>
                                                            {this.state.idValid.msg}
                                                        </FormFeedback>
                                                    </Col>
                                                        <Col>
                                                            <Button 
                                                                outline 
                                                                className="dbl-ck-btn"
                                                                onClick={() => this.checkId(this.state.id)}
                                                            >
                                                                중복검사
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <UncontrolledTooltip placement="top" target="bottom-id" delay={0}>
                                                    4자 이상 16자 이하로 입력
                                                </UncontrolledTooltip>
                                            </FormGroup>
                                            {/* 비밀번호 입력 */}
                                            <FormGroup>
                                                <div className="register-group" id='bottom-password'>
                                                    <Label className="register-icon"> 
                                                        <FontAwesomeIcon icon={faLock} /> 비밀번호 
                                                    </Label>
                                                    <Input 
                                                        className='input-register' 
                                                        placeholder="Password" 
                                                        type="password" 
                                                        id="password" 
                                                        onChange={this.setPasswordHandler} 
                                                        valid={this.state.passwordValid.stat === "success"}
                                                        invalid={this.state.passwordValid.stat === "error"} 
                                                    />
                                                    <FormFeedback>
                                                        {this.state.passwordValid.msg}
                                                    </FormFeedback>
                                                </div>
                                                <UncontrolledTooltip placement="top" target="bottom-password" delay={0} style={{ width: "200px" }}>
                                                    영문, 숫자, 특수문자(!@#$%^&*)를 조합하여 8-20자로 입력
                                                </UncontrolledTooltip>
                                            </FormGroup>
                                            {/* 이름 입력 */}
                                            <FormGroup>
                                                <div className="register-group" id='bottom-name'>
                                                    <Label className="register-icon"> 
                                                        <FontAwesomeIcon icon={faUser} /> 이름 
                                                    </Label>
                                                    <Input 
                                                        className='input-register' 
                                                        placeholder="홍길동" 
                                                        id="name" 
                                                        onChange={this.setNameHandler}
                                                        valid={this.state.nameValid.stat === "success"}
                                                        invalid={this.state.nameValid.stat === "error"} 
                                                    />
                                                    <FormFeedback>
                                                        {this.state.nameValid.msg}
                                                    </FormFeedback>
                                                </div>
                                                <UncontrolledTooltip placement="top" target="bottom-name" delay={0}>
                                                    2자 이상 16자 이하로 입력
                                                </UncontrolledTooltip>
                                            </FormGroup>
                                            {/* 이메일 입력 */}
                                            <FormGroup>
                                                <div className="register-group" id='bottom-email'>
                                                    <Row>
                                                        <Label className="register-icon"> 
                                                            <FontAwesomeIcon icon={faEnvelope} /> 이메일 
                                                        </Label>
                                                    </Row>
                                                    <Row>
                                                        <Col xs="9">
                                                            <Input 
                                                                className='input-register' 
                                                                placeholder="sample@google.com" 
                                                                type="email" 
                                                                id="username"  
                                                                onChange={this.setEmailHandler} 
                                                                valid={this.state.emailValid.stat === "success"}
                                                                invalid={this.state.emailValid.stat === "error"} 
                                                            />
                                                            <FormFeedback>
                                                                {this.state.emailValid.msg}
                                                            </FormFeedback>
                                                        </Col>
                                                        <Col>
                                                            <Button 
                                                                outline 
                                                                className="dbl-ck-btn"
                                                                onClick={() => this.checkEmail(this.state.email)}    
                                                            >
                                                                중복검사
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <UncontrolledTooltip placement="top" target="bottom-email" delay={0}>
                                                    @을 포함하여 입력
                                                </UncontrolledTooltip>
                                            </FormGroup>
                                            {/* 전화번호 입력 */}
                                            <FormGroup>
                                                <div className="register-group" id='bottom-phone'>
                                                    <Label className="register-icon"> 
                                                        <FontAwesomeIcon icon={faPhone} /> 전화번호 
                                                    </Label>
                                                    <Input 
                                                        className='input-register' 
                                                        placeholder="010-0000-0000" 
                                                        type="tel" 
                                                        id="phone" 
                                                        value={this.state.phone} 
                                                        onChange={this.setPhoneHandler} 
                                                        valid={this.state.phoneValid.stat === "success"}
                                                        invalid={this.state.phoneValid.stat === "error"} 
                                                    />
                                                    <FormFeedback>
                                                        {this.state.phoneValid.msg}
                                                    </FormFeedback>
                                                </div>
                                                <UncontrolledTooltip placement="top" target="bottom-phone" delay={0}>
                                                    -을 포함하여 입력
                                                </UncontrolledTooltip>
                                            </FormGroup>
                                            {/* 회원가입 완료 버튼 */}
                                            <Button 
                                                block 
                                                className="register-btn" 
                                                type='button'
                                                onClick={this.signUp}
                                            >
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

    /* 아이디 중복 검사 및 유효성 검사*/
    checkId = (id) => {
        if(id === '')
            this.setState({
                idValid: {stat: 'error', msg: '아이디를 입력하세요'}
            });
        else {
            MemberService.checkId(id).then(res => {
                if(res.data)
                    this.setState({
                        idValid: {stat: 'error', msg: '사용 중인 아이디입니다'}
                    });
                else {
                    if(spaceRegEx.test(id))
                        this.setState({
                            idValid: {stat: 'error', msg: '공백이 존재합니다'}
                        });
                    else if(!idRegEx.test(id))
                        this.setState({
                            idValid: {stat: 'error', msg: '4자 이상 16자 이하의 한 단어로 입력하세요'}
                        });
                    else
                        this.setState({
                            lastId: id,
                            idValid: {stat: 'success', msg: '사용 가능한 아이디입니다'}
                        });
                }
            });
        }
    }

    /* 이메일 중복 검사 및 유효성 검사*/
    checkEmail = (email) => {
        if(email === '')
            this.setState({
                emailValid: {stat: 'error', msg: '이메일을 입력하세요'}
            });
        else {
            MemberService.checkEmail(email).then(res => {
                if(res.data)
                    this.setState({
                        emailValid: {stat: 'error', msg: '가입된 이메일입니다'}
                    });
                else {
                    if(spaceRegEx.test(email))
                        this.setState({
                            emailValid: {stat: 'error', msg: '공백이 존재합니다'}
                        });
                    else if(!emailRegEx.test(email))
                        this.setState({
                            emailValid: {stat: 'error', msg: '이메일을 올바르게 입력하세요'}
                        });
                    else
                        this.setState({
                            lastEmail: email,
                            emailValid: {stat: 'success', msg: '사용 가능한 이메일입니다'}
                        });
                }
            });
        }
    }

    /* 유효성 검사 */
    formValidation = () => {
        /* 아이디 */
        if(this.state.id === '')
            this.setState({
                idValid: {stat: 'error', msg: '아이디를 입력하세요'}
            });
        else if(spaceRegEx.test(this.state.id))
            this.setState({
                idValid: {stat: 'error', msg: '공백이 존재합니다'}
            });
        else if(!idRegEx.test(this.state.id))
            this.setState({
                idValid: {stat: 'error', msg: '4자 이상 16자 이하의 한 단어로 입력하세요'}
            });
        else if(this.state.idValid.stat !== 'success' || (this.state.id !== this.state.lastId))
            this.setState({
                idValid: {stat: 'error', msg: '중복 검사를 해주세요'}
            });
        

        // if(this.state.idValid.stat === '' || this.state.idValid.stat === 'error')
        //     alert("아이디를 확인해주세요")

        /* 비밀번호 */
        if(this.state.password === '')
            this.setState({
                passwordValid: {stat: 'error', msg: '비밀번호를 입력하세요'}
            });
        else if(spaceRegEx.test(this.state.password))
            this.setState({
                passwordValid: {stat: 'error', msg: '공백이 존재합니다'}
            });
        else if(!pwdRegEx.test(this.state.password))
            this.setState({
                passwordValid: {stat: 'error', msg: '영문, 숫자, 특수문자(!@#$%^&*)를 조합하여 8-20자로 입력하세요'}
            });
        else
            this.setState({
                passwordValid: {stat: 'success', msg: ''}
            });

        /* 이름 */
        if(this.state.name === '')
            this.setState({
                nameValid: {stat: 'error', msg: '이름을 입력하세요'}
            });
        else if(spaceRegEx.test(this.state.name))
            this.setState({
                nameValid: {stat: 'error', msg: '공백이 존재합니다'}
            });
        else if(!nameRegEx.test(this.state.name))
            this.setState({
                nameValid: {stat: 'error', msg: '이름을 올바르게 입력하세요'}
            });
        else
            this.setState({
                nameValid: {stat: 'success', msg: ''}
            });

        /* 이메일 */
        if(this.state.email === '')
            this.setState({
                emailValid: {stat: 'error', msg: '이메일을 입력하세요'}
            });
        else if(spaceRegEx.test(this.state.email))
            this.setState({
                emailValid: {stat: 'error', msg: '공백이 존재합니다'}
            });
        else if(!emailRegEx.test(this.state.email))
            this.setState({
                emailValid: {stat: 'error', msg: '이메일을 올바르게 입력하세요'}
            });
        else if(this.state.emailValid.stat !== 'success' || (this.state.email !== this.state.lastEmail))
            this.setState({
                emailValid: {stat: 'error', msg: '중복 검사를 해주세요'}
            });
        

        /* 전화번호 */
        if(this.state.phone === '')
            this.setState({
                phoneValid: {stat: 'error', msg: '전화번호를 입력하세요'}
            });
        else if(spaceRegEx.test(this.state.phone))
            this.setState({
                phoneValid: {stat: 'error', msg: '공백이 존재합니다'}
            });
        else if(!phoneRegEx.test(this.state.phone))
            this.setState({
                phoneValid: {stat: 'error', msg: '전화번호를 올바르게 입력하세요'}
            });
        else
            this.setState({
                phoneValid: {stat: 'success', msg: ''}
            });
        window.scrollTo(0, 0);
        
    }

    signUp = async () => {
        await this.formValidation();
        if(this.state.idValid.stat === 'success' 
        && this.state.passwordValid.stat === 'success' 
        && this.state.nameValid.stat === 'success' 
        && this.state.emailValid.stat === 'success' 
        && this.state.phoneValid.stat === 'success') {
            let member = {
                id: this.state.id,
                password: this.state.password,
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone
            };
            MemberService.signUp(member)
                .then(res => this.props.history.push("/index"))
                .catch(err => alert("회원가입 오류"));
        }
    }
}

export default Register;
import React,{ useState, useContext, useEffect, useRef } from 'react';
import { Button, Card, Form, Input, Container, Row, Col, UncontrolledTooltip, FormFeedback, FormGroup, Label } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFingerprint, faLock, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

// styles
import "../assets/scss/register.scss"

// service
import MemberService from "../service/MemberService";
import AuthContext from "../service/AuthContext";

// regular expressions for fields
const idRegEx = /^.{4,16}$/;
const pwdRegEx = /(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}$/;
const nameRegEx = /^.{2,16}$/;
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const phoneRegEx = /^\d{2,3}-\d{3,4}-\d{4}$/;
const spaceRegEx = /\s/g;

const Register = (props) => {
    const authCtx = useContext(AuthContext);
    const isSuccess = authCtx.isSuccess;
    const firstUpdate = useRef(true);

    /* 입력 폼 */
    const [id, setId] = useState('');
    const [lastId, setLastId] = useState('');
    const [email, setEmail] = useState('');
    const [lastEmail, setLastEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [formValid, setFormValid] = useState(false);

    /* 유효성 검사용 */
    const [idValid, setIdValid] = useState({stat: '', msg: ''});
    const [emailValid, setEmailValid] = useState({stat: '', msg: ''});
    const [passwordValid, setPasswordValid] = useState({stat: '', msg: ''});
    const [nameValid, setNameValid] = useState({stat: '', msg: ''});
    const [phoneValid, setPhoneValid] = useState({stat: '', msg: ''});

    /* 이름 입력 */
    const setNameHandler = (e) => {
        setName(e.target.value);
    }

     /* 아이디 입력 */
    const setIdHandler = (e) => {
        setId(e.target.value);
    }

    /* 비밀번호 입력 */
    const setPasswordHandler = (e) => {
        setPassword(e.target.value);
    }

    /* 이메일 입력 */
    const setEmailHandler = (e) => {
        setEmail(e.target.value);
    }

    /* 전화번호 입력 */
    const setPhoneHandler = (e) => {
        setPhone(e.target.value);
    }

    /* 아이디 중복 검사 및 유효성 검사*/
    const checkId = (id) => {
        if(id === '')
            setIdValid({stat: 'error', msg: '아이디를 입력하세요'})
        else {
            MemberService.checkId(id).then(res => {
                if(res.data)
                    setIdValid({stat: 'error', msg: '사용 중인 아이디입니다'});
                else {
                    if(spaceRegEx.test(id))
                        setIdValid({stat: 'error', msg: '공백이 존재합니다'});
                    else if(!idRegEx.test(id))
                        setIdValid({stat: 'error', msg: '4자 이상 16자 이하의 한 단어로 입력하세요'});
                    else {
                        setLastId(id);
                        setIdValid({stat: 'success', msg: '사용 가능한 아이디입니다'});
                    }
                }
            });
        }
    }

    /* 이메일 중복 검사 및 유효성 검사*/
    const checkEmail = (email) => {
        if(email === '')
            setEmailValid({stat: 'error', msg: '이메일을 입력하세요'});
        else {
            MemberService.checkEmail(email).then(res => {
                if(res.data)
                    setEmailValid({stat: 'error', msg: '가입된 이메일입니다'});
                else {
                    if(spaceRegEx.test(email))
                        setEmailValid({stat: 'error', msg: '공백이 존재합니다'});
                    else if(!emailRegEx.test(email))
                        setEmailValid({stat: 'error', msg: '이메일을 올바르게 입력하세요'});
                    else {
                        setLastEmail(email);
                        setEmailValid({stat: 'success', msg: '사용 가능한 이메일입니다'});
                    }
                }
            });
        }
    }

    /* 유효성 검사 */
    const formValidation = () => {
        return new Promise(resolve => {
        /* 아이디 */
        if(id === '')
            setIdValid({stat: 'error', msg: '아이디를 입력하세요'});
        else if(spaceRegEx.test(id))
            setIdValid({stat: 'error', msg: '공백이 존재합니다'});
        else if(!idRegEx.test(id))
            setIdValid({stat: 'error', msg: '4자 이상 16자 이하의 한 단어로 입력하세요'});
        else if(idValid.stat !== 'success' || (id !== lastId))
            setIdValid({stat: 'error', msg: '중복 검사를 해주세요'});

        /* 비밀번호 */
        if(password === '')
            setPasswordValid({stat: 'error', msg: '비밀번호를 입력하세요'});
        else if(spaceRegEx.test(password))
            setPasswordValid({stat: 'error', msg: '공백이 존재합니다'});
        else if(!pwdRegEx.test(password))
            setPasswordValid({stat: 'error', msg: '영문, 숫자, 특수문자(!@#$%^&*)를 조합하여 8-20자로 입력하세요'});
        else
            setPasswordValid({stat: 'success', msg: ''});

        /* 이름 */
        if(name === '')
            setNameValid({stat: 'error', msg: '이름을 입력하세요'});
        else if(spaceRegEx.test(name))
            setNameValid({stat: 'error', msg: '공백이 존재합니다'});
        else if(!nameRegEx.test(name))
            setNameValid({stat: 'error', msg: '이름을 올바르게 입력하세요'});
        else
            setNameValid({stat: 'success', msg: ''});

        /* 이메일 */
        if(email === '')
            setEmailValid({stat: 'error', msg: '이메일을 입력하세요'});
        else if(spaceRegEx.test(email))
            setEmailValid({stat: 'error', msg: '공백이 존재합니다'});
        else if(!emailRegEx.test(email))
            setEmailValid({stat: 'error', msg: '이메일을 올바르게 입력하세요'});
        else if(emailValid.stat !== 'success' || (email !== lastEmail))
            setEmailValid({stat: 'error', msg: '중복 검사를 해주세요'});
        

        /* 전화번호 */
        if(phone === '')
            setPhoneValid({stat: 'error', msg: '전화번호를 입력하세요'});
        else if(spaceRegEx.test(phone))
            setPhoneValid({stat: 'error', msg: '공백이 존재합니다'});
        else if(!phoneRegEx.test(phone))
            setPhoneValid({stat: 'error', msg: '전화번호를 올바르게 입력하세요'});
        else
            setPhoneValid({stat: 'success', msg: ''});
        window.scrollTo(0, 0);
        resolve("resolved");
        });
    }

    const signUp = async(e) => {
        e.preventDefault();
        await formValidation();
        setFormValid(true);
    }

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
        }
        else {
            if (isSuccess)
                props.history.push("/index");
            else {
                alert("회원가입 오류");
                console.log("isSuccess in Register page => " + authCtx.isSuccess);
            }
        }
    }, [isSuccess]);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
        }
        else {
            if(idValid.stat === 'success' 
            && passwordValid.stat === 'success' 
            && nameValid.stat === 'success' 
            && emailValid.stat === 'success' 
            && phoneValid.stat === 'success') {
                console.log("all success");
                let member = {
                    id: id,
                    password: password,
                    name: name,
                    email: email,
                    phone: phone
                };
                authCtx.signup(member);
            }
            else {
                console.log("not all success");
                setFormValid(false);
            }
        }
    }, [formValid])

    return (
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
                                                    onChange={setIdHandler} 
                                                    valid={idValid.stat === "success"}
                                                    invalid={idValid.stat === "error"} 
                                                />
                                                <FormFeedback>
                                                    {idValid.msg}
                                                </FormFeedback>
                                            </Col>
                                                <Col>
                                                    <Button 
                                                        outline 
                                                        className="dbl-ck-btn"
                                                        onClick={() => checkId(id)}
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
                                                onChange={setPasswordHandler} 
                                                valid={passwordValid.stat === "success"}
                                                invalid={passwordValid.stat === "error"} 
                                            />
                                            <FormFeedback>
                                                {passwordValid.msg}
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
                                                onChange={setNameHandler}
                                                valid={nameValid.stat === "success"}
                                                invalid={nameValid.stat === "error"} 
                                            />
                                            <FormFeedback>
                                                {nameValid.msg}
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
                                                        onChange={setEmailHandler} 
                                                        valid={emailValid.stat === "success"}
                                                        invalid={emailValid.stat === "error"} 
                                                    />
                                                    <FormFeedback>
                                                        {emailValid.msg}
                                                    </FormFeedback>
                                                </Col>
                                                <Col>
                                                    <Button 
                                                        outline 
                                                        className="dbl-ck-btn"
                                                        onClick={() => checkEmail(email)}    
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
                                                value={phone} 
                                                onChange={setPhoneHandler} 
                                                valid={phoneValid.stat === "success"}
                                                invalid={phoneValid.stat === "error"} 
                                            />
                                            <FormFeedback>
                                                {phoneValid.msg}
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
                                        onClick={signUp}
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
    );
};

export default Register;
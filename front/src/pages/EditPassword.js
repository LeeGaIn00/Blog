import React, { useContext, useEffect, useState, useRef  } from "react";

// styles
import '../assets/scss/editInfo.scss';

// components
import HeaderNavs from "../components/HeaderNavs";

// service
import AuthContext from '../service/AuthContext';

const pwdRegEx = /(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}$/;
const spaceRegEx = /\s/g;

const EditPassword = (props) => {
    const authCtx = useContext(AuthContext);
    const isSuccess = authCtx.isSuccess;
    const firstUpdate = useRef(true);
    const exPasswordInputRef = useRef(null);
    const newPasswordInputRef = useRef(null);
    const newPasswordAgainInputRef = useRef(null);

    useEffect(() => {
        authCtx.getUser();
    }, []);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
        }
        else {
            if (isSuccess) {
                authCtx.logout();
                alert("비밀번호가 변경되었습니다. 다시 로그인하세요");
                props.history.push("/index");
            }
        }
    }, [isSuccess]);

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredExPassword = exPasswordInputRef.current?.value;
        const enteredNewPassword = newPasswordInputRef.current?.value;
        const enteredNewPasswordAgain = newPasswordAgainInputRef.current?.value;
        
        if(enteredExPassword === '' || enteredNewPassword === '' || enteredNewPasswordAgain === '') {
            alert("비밀번호를 입력하세요");
            return;
        }
        else if(spaceRegEx.test(enteredNewPassword)) {
            alert("비밀번호에 공백이 존재합니다");
            return;
        }
        else if(!pwdRegEx.test(enteredNewPassword)) {
            alert("영문, 숫자, 특수문자(!@#$%^&*)를 조합하여 8-20자로 입력하세요")
        }
        else if (enteredNewPassword !== enteredNewPasswordAgain) {
            alert("비밀번호 확인이 올바르지 않습니다");
            return;
        } else {
            authCtx.changePassword(enteredExPassword, enteredNewPassword);
        }
    }

    return (
        <div className="ei-body">
            <HeaderNavs />
            <div className="ei-pwd-main">
                <form onSubmit={submitHandler}>
                    <div className="ei-pwd-wrapper">
                        <div className="ei-pwd-title">
                            현재 비밀번호
                        </div>
                        <div> <input type='password' ref={exPasswordInputRef}/> </div>
                    </div>
                    <div className="ei-pwd-wrapper">
                        <div className="ei-pwd-title">
                            새 비밀번호
                        </div>
                        <div> <input type='password' ref={newPasswordInputRef}/> </div>
                    </div>
                    <div className="ei-pwd-wrapper">
                        <div className="ei-pwd-title">
                            새 비밀번호 확인
                        </div>
                        <div> <input type='password' ref={newPasswordAgainInputRef} /> </div>
                    </div>
                    <div className="ei-btn"> <button type='submit'> 변경 </button></div>
                </form>
            </div>
        </div>
    );
};

export default EditPassword;
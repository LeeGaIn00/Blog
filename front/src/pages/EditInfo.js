import React, { useContext, useEffect, useState, useRef  } from "react";

// styles
import '../assets/scss/editInfo.scss';

// components
import HeaderNavs from "../components/HeaderNavs";

// service
import PostService from '../service/PostService';

import AuthContext from '../service/AuthContext';

const pwdRegEx = /(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}$/;
const spaceRegEx = /\s/g;

/* 마이페이지 */
const EditInfo = (props) => {
    const id = props.match.params.id;
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

    // 이미지 보여주는 함수
    const showImg = (e) => {
        const fileName = e.target.value.substring(12);
        
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        console.log(reader);

        reader.onload = e => {
            document.getElementsByClassName('ei-img')[0].getElementsByTagName('img')[0].src = e.target.result;
        }
    }

    const dataURLtoFile = (dataurl) => {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const filename = authCtx.user.id + new Date().getTime() +  '_profile.' + mime.substring(6)
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n) {
          u8arr[n - 1] = bstr.charCodeAt(n - 1)
          n -= 1 
        }
        return new File([u8arr], filename, { type: mime })
    }

    const uploadImg = () => {
        const url = document.getElementsByClassName('ei-img')[0].getElementsByTagName('img')[0].src
        // 이미지 변경 됐으면 저장
        if(url.startsWith('data')) {
            let form = new FormData();
            const file =  dataURLtoFile(url);
            form.append("file", file); 
    
            PostService.imgUpload(form).then(res => {
                // console.log(res.data[0]);
                const fileName = res.data[0].fileName; // 저장 한 파일 이름
                authCtx.changeProfile(fileName);
            });
        } else {
            alert('변경 할 이미지를 선택하세요.');
        }
    }

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
        <>
            <HeaderNavs id={id} />
            <div className="ei-wrapper">
                <div className="ei-profile-wrapper">
                    <div className="ei-profile-title">
                        프로필 사진
                    </div>
                    <div className="ei-img">
                        <img
                            className="ei-profile"
                            alt="profile"
                            src={`${process.env.PUBLIC_URL}/${authCtx.user.profile}`}/>
                         <div className="input-file"> <input type='file' accept="image/*" onChange = {(e) => showImg(e)}/> </div>                    
                    </div>
                </div>
                {/* <div className="ei-btn"> <input type='button' value="변경" onClick={uploadImg}/> </div> */}
                <div className="ei-btn"> <button type='button' onClick={uploadImg}> 변경 </button> </div>
                <hr/>
                <form onSubmit={submitHandler}>
                    <div className="ei-profile-wrapper">
                        <div className="ei-profile-title">
                            현재 비밀번호
                        </div>
                        <div> <input type='password' ref={exPasswordInputRef}/> </div>
                    </div>
                    <div className="ei-profile-wrapper">
                        <div className="ei-profile-title">
                            새 비밀번호
                        </div>
                        <div> <input type='password' ref={newPasswordInputRef}/> </div>
                    </div>
                    <div className="ei-profile-wrapper">
                        <div className="ei-profile-title">
                            새 비밀번호 확인
                        </div>
                        <div> <input type='password' ref={newPasswordAgainInputRef} /> </div>
                    </div>
                    <div className="ei-btn"> <button type='submit'> 변경 </button></div>
                </form>
            </div>
        </>
    );
}

export default EditInfo;
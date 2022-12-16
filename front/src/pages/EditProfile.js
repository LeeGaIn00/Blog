import React, { useContext, useEffect, useState, useRef  } from "react";

// styles
import '../assets/scss/editInfo.scss';

// components
import HeaderNavs from "../components/HeaderNavs";

// service
import PostService from '../service/PostService';
import AuthContext from '../service/AuthContext';

const EditProfile = (props) => {
    const authCtx = useContext(AuthContext);
    const isSuccess = authCtx.isSuccess;
    const firstUpdate = useRef(true);

    useEffect(() => {
        authCtx.getUser();
    }, []);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
        }
        else {
            if (isSuccess) {
                alert("프로필 사진이 변경되었습니다.");
                props.history.push("/mypage");
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

    return (
        <div className="ei-body">
            <HeaderNavs />
            <div className="ei-profile-main">
                <div className="ei-profile-wrapper">
                    <div className="ei-img">
                        <img
                            className="ei-profile"
                            alt="profile"
                            src={`${process.env.PUBLIC_URL}/img/${authCtx.user.profile}`}/>
                         <div className="input-file"> <input type='file' accept="image/*" onChange = {(e) => showImg(e)}/> </div>                    
                    </div>
                </div>
                <div className="ei-btn"> <button type='button' onClick={uploadImg}> 변경 </button> </div>
            </div>
        </div>
    );
};

export default EditProfile;
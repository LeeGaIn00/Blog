import React, { useContext, useEffect, useState } from "react";

// styles
import '../assets/scss/editInfo.scss';

// components
import HeaderNavs from "../components/HeaderNavs";

// service
import MemberService from "../service/MemberService";
import PostService from '../service/PostService';

/* 마이페이지 */
const EditInfo = (props) => {
    const [user, setUser] = useState({});
    const id = props.match.params.id;

    useEffect(() => {
        MemberService.getOneMember(id).then(res => {
            setUser(res.data);
        })
    }, []);

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
        const filename = user.id + new Date().getTime() +  '_profile.' + mime.substring(6)
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
                console.log(res.data);
                const fileName = res.data.fileName; // 저장 한 파일 이름
            });
        } else {
            alert('변경 할 이미지를 선택하세요.');
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
                            src={`${process.env.PUBLIC_URL}/${user.profile}`}/>
                         <div className="input-file"> <input type='file' accept="image/*" onChange = {(e) => showImg(e)}/> </div>                    
                    </div>
                </div>
                <div className="ei-btn"> <input type='button' value="확인" onClick={uploadImg}/> </div>
                <hr/>
                <div className="ei-profile-wrapper">
                    <div className="ei-profile-title">
                        새 비밀번호
                    </div>
                    <div> <input type='password'/> </div>
                </div>
                <div className="ei-profile-wrapper">
                    <div className="ei-profile-title">
                        비밀번호 확인
                    </div>
                    <div> <input type='password'/> 
                          <input type='button' value="확인" /></div>
                </div>
                <div className="ei-btn"> <input type='button' value="확인"/> </div>
            </div>
        </>
    );
}

export default EditInfo;
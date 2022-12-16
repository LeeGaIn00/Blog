import React, { useContext, useEffect, useState } from "react";

// styles
import '../assets/scss/editInfo.scss';

// components
import HeaderNavs from "../components/HeaderNavs";

// service
import MemberService from "../service/MemberService";

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
        console.log(e.target.files[0])
    }

    return (
        <>
            <HeaderNavs id={id} />
            <div className="ei-wrapper">
                <div className="ei-profile-wrapper">
                    <div className="ei-profile-title">
                        프로필 사진
                    </div>
                    <div>
                        <img
                            className="ei-profile"
                            alt="profile"
                            src={`${process.env.PUBLIC_URL}/${user.profile}`}/>
                         <div className="input-file"> <input type='file' onChange = {(e) => showImg(e)}/> </div>                    
                    </div>
                </div>
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
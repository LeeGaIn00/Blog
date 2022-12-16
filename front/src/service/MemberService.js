import axios from 'axios';

const MEMBER_API_BASE_URL = "http://localhost:8080/member";

class MemberService {
    getAllMember() {
        return axios.get(MEMBER_API_BASE_URL + '/index');
    }
    getProfile(id) {
        return axios.get(MEMBER_API_BASE_URL + '/profile/' + id);
    }
    getSearchMember(search) {
        return axios.get(MEMBER_API_BASE_URL + "/?search=" + search);
    }
    getOneMember(id){
        return axios.get(MEMBER_API_BASE_URL + "/" + id);
    }
    /* 아이디 중복 검사 */
    checkId(id) {
        return axios.get(MEMBER_API_BASE_URL + "/check/id/" + id);
    }
    /* 이메일 중복 검사 */
    checkEmail(email) {
        return axios.get(MEMBER_API_BASE_URL + "/check/email/" + email);
    }
}

export default new MemberService();
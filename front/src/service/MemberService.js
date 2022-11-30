import axios from 'axios';

const POST_API_BASE_URL = "http://localhost:8080";

class MemberService {
    getAllMember() {
        return axios.get(POST_API_BASE_URL + '/index');
    }
    getProfile(id) {
        return axios.get(POST_API_BASE_URL + '/member/profile/' + id);
    }
    getSearchMember(search) {
        return axios.get(POST_API_BASE_URL + "/member/?search=" + search);
    }
}

export default new MemberService();
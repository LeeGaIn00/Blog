import axios from 'axios';

const POST_API_BASE_URL = "http://localhost:8080/member";

class MemberService {
    getProfile(id) {
        return axios.get(POST_API_BASE_URL + '/profile/' + id);
    }
}

export default new MemberService();
import axios from 'axios';

const POST_API_BASE_URL = "http://localhost:8080/post";

class PostService {
    getAllPost(id) {
        return axios.get(POST_API_BASE_URL + "s/" + id);
    }
    createPost(post) {
        return axios.post(POST_API_BASE_URL, post);
    }
    getPost(id) {
        return axios.get(POST_API_BASE_URL + "/" + id);
    }
    /* 조회수 */ 
    setCounts(id){
        return axios.post(POST_API_BASE_URL + "/" + id, {}, { withCredentials: true });
    }
}

export default new PostService();
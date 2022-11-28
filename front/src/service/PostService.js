import axios from 'axios';

const POST_API_BASE_URL = "http://localhost:8080/post";

class PostService {
    getAllPost(id) {
        return axios.get(POST_API_BASE_URL + "s/" + id);
    }
    createPost(data) {
        return axios.post(POST_API_BASE_URL, data);
    }
    getPost(no) {
        return axios.get(POST_API_BASE_URL + "/" + no, { withCredentials: true });
    }
    updatePost(no, post){
        return axios.put(POST_API_BASE_URL + "/" + no, post);
    }
    deletePost(no){
        return axios.delete(POST_API_BASE_URL + "/" + no);
    }
}

export default new PostService();
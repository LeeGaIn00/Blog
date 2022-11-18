import axios from 'axios';

const POST_API_BASE_URL = "http://localhost:8080";

class PostService {
    getAllPost() {
        return axios.get(POST_API_BASE_URL+"/post");
    }
    createPost(post) {
        return axios.post(POST_API_BASE_URL+"/post", post);
    }
}

export default new PostService();
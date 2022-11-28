import axios from 'axios';

const POST_API_BASE_URL = "http://localhost:8080/post";

class PostService {
    getAllPost(id) {
        return axios.get(POST_API_BASE_URL + "/" + id);
    }
    createPost(data) {
        return axios.post(POST_API_BASE_URL, data);
    }
    getPost(no) {
        return axios.get(POST_API_BASE_URL + "/detail/" + no, { withCredentials: true });
    }
    getSearchPost(search){
        return axios.get(POST_API_BASE_URL+"/search/?search=" + search);
    }
    updatePost(no, post){
        return axios.put(POST_API_BASE_URL + "/" + no, post);
    }
    deletePost(no){
        return axios.delete(POST_API_BASE_URL + "/" + no);
    }

    /* comment */
    getAllComment(no) {
        return axios.get(POST_API_BASE_URL + "/comment/" + no);
    }
    createComment(comment) {
        return axios.post(POST_API_BASE_URL + "/comment/add", comment, null);
    }
    updateComment(commentNo, comment) {
        return axios.put(POST_API_BASE_URL + "/comment/update/" + commentNo, comment, null);
    }
    deleteComment(postNo, commentNo) {
        return axios.delete(POST_API_BASE_URL + "/comment/delete/" + postNo + "/" + commentNo, null);
    }
}

export default new PostService();
import axios from 'axios';

const POST_API_BASE_URL = "http://localhost:8080/post";

class PostService {
    getAllPost(id) {
        return axios.get(POST_API_BASE_URL + "s/" + id);
    }
    createPost(post) {
        return axios.post(POST_API_BASE_URL, post);
    }
    getPost(no) {
        return axios.get(POST_API_BASE_URL + "/" + no);
    }
    getSearchPost(search){
        return axios.get(POST_API_BASE_URL+"/search/?search=" + search);
    }
    // /* 조회수 */ 
    // setCounts(id){
    //     return axios.post(POST_API_BASE_URL + "/" + id, {}, { withCredentials: true });
    // }
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
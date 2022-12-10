import axios from 'axios';

const BASE_URL = "http://localhost:8080";
const POST_API_BASE_URL = "http://localhost:8080/post";

class PostService {
    getAllPost(id, category) {
        return axios.post(POST_API_BASE_URL + "/" + id + "?category=" + category);
    }
    createPost(data) {
        return axios.post(POST_API_BASE_URL, data);
    }
    imgUpload(form) {
        return axios.post(BASE_URL + "/upload", form, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
    getPost(no) {
        return axios.get(POST_API_BASE_URL + "/detail/" + no, { withCredentials: true });
    }
    getSearchPost(id, category, search){
        return axios.post(POST_API_BASE_URL+"/search?memberId=" + id + "&category=" + category + "&search=" + search);
    }
    getSearchPostByTag(id, category, tag){
        return axios.get(POST_API_BASE_URL+"/searchtag?memberId=" + id + "&category=" + category + "&tag=" + tag);
    }
    updatePost(no, data){
        return axios.put(POST_API_BASE_URL + "/" + no, data);
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
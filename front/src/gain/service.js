import axios from 'axios';

const BASE_URL = "http://localhost:8080/post"

class Service {
    
    getAllPost() {
        return axios.get(BASE_URL)
    }
    getPost(id) {
        return axios.get(BASE_URL + "/" + id);
    }
    /* 조회수 */ 
    setCounts(id){
        return axios.post(BASE_URL + "/" + id, {}, { withCredentials: true });
    }
}

export default new Service();
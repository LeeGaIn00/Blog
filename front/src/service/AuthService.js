import axios from 'axios';

const AUTH_API_BASE_URL = "http://localhost:8080/auth";

const createTokenHeader = (token) => {
    return {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
};

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
};

class AuthService {
    /* 회원가입 */
    // signUp(member) {
    //     return axios.post(AUTH_API_BASE_URL + "/signup", member);
    // }
    /* 로그인 */
    // login(member) {
    //     return axios.post(AUTH_API_BASE_URL + "/login", member);
    // }

    loginTokenHandler = (token, expirationTime) => {
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', String(expirationTime));
    
        const remainingTime = calculateRemainingTime(expirationTime);
        return remainingTime;
    }
    
    retrieveStoredToken = () => {
        const storedToken = localStorage.getItem('token');
        const storedExpirationDate = localStorage.getItem('expirationTime') || '0';
    
        const remaingTime = calculateRemainingTime(+ storedExpirationDate);
    
        if(remaingTime <= 1000) {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationTime');
            return null
        }
    
        return {
            token: storedToken,
            duration: remaingTime
        }
    }
    
    signupActionHandler = (member) => {
        return axios.post(AUTH_API_BASE_URL + "/signup", member, {});
    };
    
    loginActionHandler = (id, password) => {
        let loginObject = { id, password };
        return axios.post(AUTH_API_BASE_URL + "/login", loginObject, {});
    };
    
    logoutActionHandler = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
    };

    getUserActionHandler = (token) => {
        return axios.get("http://localhost:8080/member/me", createTokenHeader(token));
    }
}

export default new AuthService();
import {postBodyRequest, putBodyRequest} from "./RequestFunction";
import {publicApi} from "./ApiConfiguration";

export default class AuthService {

    static async login(loginData) {
        return postBodyRequest('/user/login', loginData);
    }

    static async register(registerData) {
        return postBodyRequest('/user/register', registerData);
    }

    static async confirmation(confirmationData) {
        return postBodyRequest('/user/confirmation', confirmationData);
    }

    static async resetPassword(resetData) {
        return putBodyRequest('/user/resetPassword', resetData);
    }

    static async refreshToken() {
        const token = localStorage.getItem('refreshToken')
        const response = (await publicApi.post("/user/refreshToken", null, {
            headers: {
                Authorization: token
            }
        })).data
        localStorage.setItem('authToken', 'Bearer ' + response.access_token)
        return response
    }

}
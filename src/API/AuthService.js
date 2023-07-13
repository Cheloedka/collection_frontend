import {postBodyRequest} from "./RequestFunction";

export default class AuthService {

    static async login(loginData) {
        return postBodyRequest('/user/login', loginData);
    }
    static async register(registerData){
        return postBodyRequest('/user/register', registerData);
    }

    static async confirmation(confirmationData){
        return postBodyRequest('/user/confirmation', confirmationData);
    }

}
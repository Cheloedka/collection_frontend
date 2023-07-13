import {getRequest, getRequestWithAuth} from "./RequestFunction";

export default class UserService {

    static async userNav() {
        return await getRequestWithAuth("/navbar")
    }
    static async userPageInfo(username) {
        return await getRequest('/user/' + username)
    }

}
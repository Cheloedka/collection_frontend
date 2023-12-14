import {deleteRequestWithAuth, getRequest, getRequestWithAuth, putBodyRequestWithAuth} from "./requestFunction";

export default class UserService {

    static async userNav() {
        return await getRequestWithAuth("/navbar");
    }
    static async userPageInfo(username) {
        return await getRequest('/user/' + username);
    }
    static async userSettingsInfo(username) {
        return await getRequestWithAuth('/user/' + username + '/settings');
    }

    static async userAccountSettings(username, userData) {
        const formData = new FormData();
        for (let key in userData) {
            formData.append(key, userData[key]);
        }

        return await putBodyRequestWithAuth('/user/' + username + '/edit1', formData);
    }

    static async changeBackImage(username, file) {
        const formData = new FormData();
        formData.append("file", file);

        return await putBodyRequestWithAuth("/user/" + username + "/back", formData)
    }

    static async changeEmail(email) {
        return await putBodyRequestWithAuth("/user/changeEmail", email);
    }

    static async changePassword(pass) {
        return await putBodyRequestWithAuth("/user/changePassword", pass);
    }

    static async getNotifications(page, size, isRead) {
        return await getRequestWithAuth(`/notification/get?page=${page}&size=${size}&isRead=${isRead}`)
    }

    static async userDelete() {
        return await deleteRequestWithAuth("/user/delete");
    }

}
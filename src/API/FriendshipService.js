import {deleteRequestWithAuth, getRequest, postRequestWithAuth} from "./RequestFunction";

export default class FriendshipService {

    static async newFollowing(username) {
        return await postRequestWithAuth('/friendships/' + username);
    }

    static async deleteFollowing(username) {
        return await deleteRequestWithAuth('/friendships/delete/' + username);
    }

    static async getFollowing(username) {
        return await getRequest('/following/' + username);
    }

    static async getFollowers(username) {
        return await getRequest('/followers/' + username);
    }



}
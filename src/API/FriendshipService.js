import {deleteRequestWithAuth, getRequestWithAuth, postRequestWithAuth} from "./RequestFunction";

export default class FriendshipService {

    static async newFollowing(username) {
        return await postRequestWithAuth('/friendships/' + username);
    }

    static async deleteFollowing(username) {
        return await deleteRequestWithAuth('/friendships/delete/' + username);
    }

    static async isFollowingExist(username) {
        return await getRequestWithAuth('/friendships/isexist/' + username);
    }
}
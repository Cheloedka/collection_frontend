import {deleteRequestWithAuth, getRequestWithAuth, postRequestWithAuth} from "./RequestFunction";

export default class LikeService {
    static async newLike(id) {
        return await postRequestWithAuth("/like/" + id);
    }

    static async deleteLike(id) {
        return await deleteRequestWithAuth("/like/delete/" + id);
    }

    static async isLiked(id) {
        return await getRequestWithAuth("/like/isExist/" + id)
    }
}
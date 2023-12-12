import {deleteRequestWithAuth, postRequestWithAuth} from "./requestFunction";

export default class LikeService {
    static async newLike(id) {
        return await postRequestWithAuth("/like/" + id);
    }

    static async deleteLike(id) {
        return await deleteRequestWithAuth("/like/delete/" + id);
    }
}
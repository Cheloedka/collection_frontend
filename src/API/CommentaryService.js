import {
    deleteRequestWithAuth,
    getRequestWithAuth,
    postBodyRequestWithAuth,
    postRequestWithAuth
} from "./RequestFunction";

export default class CommentaryService{

    static async getCommentaries(idItem) {
        return await getRequestWithAuth("/commentary/" + idItem)
    }

    static async newCommentary(commentData) {
        return await postBodyRequestWithAuth("/commentary/new", commentData)
    }

    static async deleteCommentary(id) {
        return await deleteRequestWithAuth("/commentary/delete/" + id)
    }

    static async likeCommentary(id) {
        return await postRequestWithAuth("/auth/commentary/like/" + id)
    }

    static async deleteLikeCommentary(id) {
        return await deleteRequestWithAuth("/auth/commentary/like/delete/" + id)
    }



}
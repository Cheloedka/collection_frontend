import {
    deleteRequestWithAuth, getRequest,
    postBodyRequestWithAuth,
    postRequestWithAuth, putBodyRequestWithAuth
} from "./RequestFunction";

export default class CommentaryService{

    static async getCommentaries(idItem) {
        return await getRequest(`/commentary/${idItem}`)
    }

    static async newCommentary(commentData) {
        return await postBodyRequestWithAuth("/commentary/new", commentData)
    }

    static async deleteCommentary(id) {
        return await deleteRequestWithAuth("/commentary/delete/" + id)
    }

    static async likeCommentary(id) {
        return await postRequestWithAuth("/commentary/like/" + id)
    }

    static async dislikeCommentary(id) {
        return await postRequestWithAuth("/commentary/dislike/" + id)
    }

    static async deleteLikeCommentary(id) {
        return await deleteRequestWithAuth("/commentary/like/delete/" + id)
    }

    static async editCommentary(id, commentData) {
        return await putBodyRequestWithAuth("/commentary/edit/" + id, commentData)
    }



}
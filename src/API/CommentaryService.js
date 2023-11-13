import {deleteRequestWithAuth, getRequestWithAuth, postBodyRequestWithAuth} from "./RequestFunction";

export default class CommentaryService{

    static async getCommentaries(idItem) {
        return await getRequestWithAuth("/commentary/" + idItem)
    }

    static async newCommentary(commentData) {
        return await postBodyRequestWithAuth("/commentary/new", commentData)
    }

    static async deleteCommentary(idCommentary) {
        return await deleteRequestWithAuth("/commentary/delete/" + idCommentary)
    }



}
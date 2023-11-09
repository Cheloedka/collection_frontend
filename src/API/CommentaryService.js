import {getRequestWithAuth, postRequestWithAuth} from "./RequestFunction";

export default class CommentaryService{

    static async getCommentaries(idItem) {
        return await getRequestWithAuth("/commentary/" + idItem)
    }

}
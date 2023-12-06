import {getRequest} from "./RequestFunction";

export default class SearchService {

    static async firstSearch(value) {
        return await getRequest("/search/" + value)
    }

    static async searchByType(value, page, type) {
        return await getRequest(`/search/by_type/${type}/${value}?page=${page}`)
    }

    static async searchCollections(value, page) {
        return await this.searchByType(value, page, "collection")
    }

    static async searchUsers(value, page) {
        return await this.searchByType(value, page, "user")
    }

}
import {getRequest, postBodyRequestWithAuth} from "./RequestFunction";

export default class CollectionService {

    static async createCollection(collectionData) {
        const formData = new FormData();
        for (let key in collectionData) {
            formData.append(key, collectionData[key]);
        }

        return postBodyRequestWithAuth('/collection/new', formData);
    }

    static async getCollection(id, username) {
        return await getRequest('/collection/' + username + '/' + id);
    }

    static async getAllCollections(username) {
        return await getRequest('/collections/' + username);
    }

    static async editCollection(id, collectionData) {
        const formData = new FormData();
        for (let key in collectionData) {
            formData.append(key, collectionData[key]);
            console.log(formData.get(key))
        }
        return await postBodyRequestWithAuth("/collection/" + id + "/edit", formData);
    }

}
import {
    deleteRequestWithAuth,
    getRequest,
    getRequestWithAuth,
    postBodyRequestWithAuth,
    putBodyRequestWithAuth
} from "./requestFunction";

export default class ItemService {

    static async newItem(data, images) {
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i])
        }
        return await postBodyRequestWithAuth("/item/new", formData)
    }

    static async getItem(idCollection, idItem, username) {
        return await getRequest("/item/" + username + "/" + idCollection + "/" + idItem)
    }

    static async getItemForEditor(idCollection, idItem) {
        return await getRequestWithAuth("/itemForEditor/" + idCollection + "/" + idItem)
    }

    static async editItem(data, oldImages, newImages) {
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        for (let i = 0; i < oldImages.length; i++) {
            formData.append("oldImages", oldImages[i].name)
        }
        for (let i = 0; i < newImages.length; i++) {
            formData.append("newImages", newImages[i])
        }

        return await putBodyRequestWithAuth("/item/edit", formData)
    }

    static async deleteItem(idItem) {
        return await deleteRequestWithAuth("/item/delete/" + idItem)
    }

    static async getByType(value, page, type) {
        return await getRequest(`/item/${type}/${value}?page=${page}`)
    }

    static async getAllItemsByUser(value, page) {
        return await this.getByType(value, page, "user")
    }

    static async getAllItemsByCollection(value, page) {
        return await this.getByType(value, page, "collection")
    }
}
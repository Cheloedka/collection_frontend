import api from "./ApiConfiguration";

export async function getRequestWithAuth(link) {
    return (await api.get('/auth' + link)).data
}

export async function getRequest(link) {
    return (await api.get(link)).data
}

export async function postRequestWithAuth(link) {
    return (await api.post('/auth' + link)).data
}

export async function postBodyRequest(link, data) {
    return (await api.post(link, data)).data
}

export async function postBodyRequestWithAuth(link, data) {
    return (await api.post('/auth' + link, data)).data
}

export async function deleteRequestWithAuth(link) {
    return (await api.delete('/auth' + link)).data
}

export async function putBodyRequestWithAuth(link, data) {
    return (await api.put('/auth' + link, data)).data
}

export async function putBodyRequest(link, data) {
    return (await api.put(link, data)).data
}

import axios from "axios";
import AuthService from "./AuthService";
import {useLogout} from "../hooks/useLogout";

export const publicApi = axios.create({
    baseURL: process.env.REACT_APP_API_LINK
})

const api = axios.create({
    baseURL: process.env.REACT_APP_API_LINK
})


api.interceptors.request.use(
    config => {
        if (localStorage.getItem('auth')) {
            config.headers['Authorization'] = localStorage.getItem('authToken')
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

api.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const access_token = await AuthService.refreshToken()
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
            return api(originalRequest);
        } catch (e) {
            if (e.response.status === 403) {
                useLogout()
            }
            return Promise.reject(error)
        }
    }
    return Promise.reject(error)
});



export default api
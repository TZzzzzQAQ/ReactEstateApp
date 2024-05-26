import axios from "axios";
import {getCookie} from "@/utils/tokenUtils.jsx";

const requestUser = axios.create({
    baseURL: '/api/user',
    timeout: 5000
})

requestUser.interceptors.request.use((config) => {
    config.headers.Authorization = 'Bearer ' + getCookie();
    config.headers.contentType = 'application/json; charset=UTF-8';
    return config;
}, (error) => Promise.reject(error));

requestUser.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    console.log(error);
    return Promise.reject(error);
})

export {requestUser};
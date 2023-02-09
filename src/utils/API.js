import axios from "axios";
import LocalStorageService from "./LocalStorageService";

const apiurl = process.env.REACT_APP_API_ENDPOINT;

axios.defaults.baseURL = apiurl;
// Add a request interceptor
axios.interceptors.request.use(
    config => {
        const token = LocalStorageService.loadState('access_token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        // config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
    });



//Add a response interceptor

axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && originalRequest.url === `token/refresh/`) {
        return Promise.reject(error);
    }

    if (error.response && error.response.status === 401) {
        originalRequest._retry = true;
        const refreshToken = LocalStorageService.loadState('refresh_token');
        return axios.post(`token/refresh/`,
            {
                "refresh": refreshToken
            })
            .then(res => {
                if (res.status === 200) {
                    LocalStorageService.saveState("access_token", res.data.access);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorageService.loadState('access_token');
                    return axios(originalRequest);
                }
            })
            .catch(error=>{
                LocalStorageService.clearState();
            })
    }
    return Promise.reject(error);
});

export default axios;
import axios from "axios";
import {auth} from "../firebase/firebase";

export const BASE_URL= 'http://localhost:5000'

const axiosInstance = axios.create({
    baseURL :BASE_URL,
})

axiosInstance.interceptors.request.use  (async config=>  {
    config.params = config.params || {};
    const token = await auth.currentUser.getIdToken()
    config.headers['Authorization'] = token
    return config
})

export default axiosInstance;
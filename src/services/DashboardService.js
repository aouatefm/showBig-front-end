import axiosInstance from './config'
import {BASE_URL} from './config'
import {getTokenId} from "../firebase/auth";
import axios from "axios";


export default {

    get_general_stats: async function () {
        try {
            const response = await axiosInstance.get(`/dashboards/stats`,
                // {headers: {'Authorization': await getTokenId()}}
            );
            return response.data;
        } catch (error) {
            return error
        }
    },



}
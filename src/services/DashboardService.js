import axiosInstance from './config'
import {getTokenId} from "../firebase/auth";


export default {

    get_admin_stats: async function () {
        try {
            const response = await axiosInstance.get(`/dashboards/stats`,
                {headers: {'Authorization': await getTokenId()}}
            );
            return response.data;
        } catch (error) {
            return error
        }
    },
    get_vendor_stats: async function () {
        try {
            const response = await axiosInstance.get(`/dashboards/vendor_stats`,
                {headers: {'Authorization': await getTokenId()}}
            );
            return response.data;
        } catch (error) {
            return error
        }
    },



}
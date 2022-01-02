import axiosInstance, {BASE_URL} from './config'
import {getTokenId} from "../firebase/auth";
import axios from "axios";


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
            return response.data

        } catch (error) {
            return error.response
        }
    },

    getVendorList: async function () {
        try {
            const response = await axios.get(BASE_URL + '/stores');
            return response.data;
        } catch (error) {
            return error
        }
    },

}
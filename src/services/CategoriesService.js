import axios from 'axios'
import {BASE_URL} from './config'

export default {
    getCategoriesList: async function () {
        try {
            const response = await axios.get(BASE_URL + '/categories');
            return response.data;
        } catch (error) {
            return error
        }
    },
    getProductById: async function (id) {
        try {
            const response = await axios.get(BASE_URL + `/categories/${id}`);
            return response.data;
        } catch (error) {
            return error
        }
    },
}
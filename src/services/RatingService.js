import axios from 'axios'
import {BASE_URL} from './config'

export default {
    getRatingsOfProduct: async function (prodcut_id) {
        try {
            const response = await axios.get(BASE_URL + '/ratings/' + prodcut_id);
            return response.data;
        } catch (error) {
            throw error
        }
    },
}
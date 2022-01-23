import axios from 'axios'
import {BASE_URL} from './config'
import {getTokenId} from "../firebase/auth";

export default {
    getRatingsOfProduct: async function (prodcut_id) {
        try {
            const response = await axios.get(BASE_URL + '/ratings/' + prodcut_id);
            return response.data;
        } catch (error) {
            throw error
        }
    },
    createRating: async function (rating_value, product_id,store_id) {
        try {
            return await axios.post(BASE_URL + `/ratings`,
                {
                    rating_value: rating_value,
                    product_id: product_id,
                    store_id:store_id
                },
                {headers: {'Authorization': await getTokenId()}});
        } catch (error) {
            return error.response
        }
    },
    canIRate: async function (product_id) {
        try {
            const response = await axios.get(BASE_URL + `/products/${product_id}/can_i_rate`, {headers: {'Authorization': await getTokenId()}});
            return response.data;
        } catch (error) {
            throw error
        }
    },
}
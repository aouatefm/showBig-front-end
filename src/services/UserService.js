import axios from 'axios';
import {BASE_URL} from './config'

export default {
    getVendorList: async function () {
        try {
            const response = await axios.get(BASE_URL + 'stores')
            return response
        } catch (error) {
            throw error
        }
    }
}


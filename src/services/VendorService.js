import axios from 'axios'
import {BASE_URL} from './config'
import {getTokenId} from "../firebase/auth";

export default {
    getVendorList: async function () {
        try {
            const response = await axios.get(BASE_URL + '/stores');
            return response.data;
        } catch (error) {
            return error
        }
    },
    getVendorNames: async function () {
        try {
            const response = await axios.get(BASE_URL + '/stores/names');
            return response.data;
        } catch (error) {
            return error
        }
    },
    getVendorById: async function (id) {
        try {
            const response = await axios.get(BASE_URL + `/stores/${id}`);
            return response.data;
        } catch (error) {
            return error
        }
    },
    addVendor: async function (name, description, address, phone, logoURL, coverURL, facebook, instagram, youtube, lat, lng) {
        try {
            const response = await axios.post(BASE_URL + `/stores`,
                {
                    name: name,
                    description: description,
                    address: address,
                    phone_number: phone,
                    logo: logoURL,
                    cover_image: coverURL,
                    lat: lat,
                    lng: lng,
                    socials: {facebook: facebook, instagram: instagram, youtube: youtube}
                },
                {headers: {'Authorization': await getTokenId()}});
            return response.data;
        } catch (error) {
            return error
        }
    },

    getStoreCustomers: async function (store_id) {
        try {
            const response = await axios.get(BASE_URL + `/stores/${store_id}/customers`,
            {headers: {'Authorization': await getTokenId()}});
            return response.data;
        } catch (error) {
            return error
        }
    },


}
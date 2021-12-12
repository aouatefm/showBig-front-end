import axios from 'axios'
import {BASE_URL} from './config'
import {getTokenId} from "../firebase/auth";

export default {
    getUser: async function (id) {
        try {
            const response = await axios.get(BASE_URL + '/users/' + id);
            return response.data;
        } catch (error) {
            throw error
        }
    },
    getUserStoreById: async function (id) {
        try {
            const response = await axios.get(BASE_URL + `/users/${id}/store`);
            return response.data;
        } catch (error) {
            throw error
        }
    },
    getUserList: async function () {
        try {
            const response = await axios.get(BASE_URL + '/users');
            return response.data;
        } catch (error) {
            throw error
        }
    },
    register: async function (data) {
        let isUserCreated, errorMsg
        await axios.post(BASE_URL + '/users', data,)
            .then(response => {
                isUserCreated = true
            })
            .catch(error => {
                isUserCreated = false
                errorMsg = error.response.data
            });
        return {isUserCreated, errorMsg}
    },

    updateUser: async function (email,firstName,lastName,phoneNumber,shippingAddress,billingAddress,imageLogoUrl,uid) {
        try {
            return await axios.put(BASE_URL + `/users/${uid}`,
                {email :email,
                    first_name:firstName,
                    last_name:lastName,
                    phone_number:phoneNumber,
                    shipping_address:shippingAddress,
                    billing_address:billingAddress,
                    avatar : imageLogoUrl},
                {headers: {'Authorization': await getTokenId()}});
        } catch (error) {
            return error.response
        }
    },

}
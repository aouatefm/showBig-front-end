import axios from 'axios'
import {BASE_URL} from './config'

export default {
    getUser: async function (id) {
        try {
            const response = await axios.get(BASE_URL + '/users/' + id);
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
    }

}
import axiosInstance from './config'
import {BASE_URL} from './config'
import {getTokenId} from "../firebase/auth";
import axios from "axios";


export default {

    createOrder: async function (name,lastName,billingAdr,shippingAdr,phone,secondPhone,delivery,payment,cartItems, totalPrice,notes) {
        try {
            const response = await axiosInstance.post(`/orders`,
                {name:name,lastName:lastName,billing_adr:billingAdr,
                    shipping_adr:shippingAdr, contact_number:phone,SecondPhone:secondPhone,
                    delivery:delivery,payment:payment, products:cartItems, totalPrice:totalPrice, notes : notes},
                // {headers: {'Authorization': await getTokenId()}}
                );
            return response.data;
        } catch (error) {
            return error
        }
    },
    getVendorOrder: async function (role) {

        try {
            const response = await axiosInstance.get(BASE_URL + `/orders?user_filter=store`,
                {headers: {'Authorization': await getTokenId()}});
            return response.data;
        } catch (error) {
            console.log(error)
            return error
        }
    },
    getCustomerOrder: async function () {

        try {
            const response = await axios.get(BASE_URL + `/orders`,
                {headers: {'Authorization': await getTokenId()}});
            return response.data;
        } catch (error) {
            console.log(error)
            return error
        }
    },
    getOrderById: async function (id) {

        try {
            const response = await axios.get(BASE_URL + `/orders/${id}`,
                {headers: {'Authorization': await getTokenId()}});
            return response.data;
        } catch (error) {
            console.log(error)
            return error
        }
    },
    UpdateOrder: async function (id,status) {

        try {
            const response = await axios.put(BASE_URL + `/orders/${id}`,{status : status},
                {headers: {'Authorization': await getTokenId()}});
            return response.data;
        } catch (error) {
            console.log(error)
            return error
        }
    },


}
import axios from 'axios'
import axiosInstance, {BASE_URL} from './config'
import {getTokenId} from "../firebase/auth";

export default {

    createCoupon: async function (name, description, type, amount, expireDays, selectedProducts, showOnStore) {
        try {
            const response = await axios.post(BASE_URL + `/coupons`,
                {
                    name: name,
                    description: description,
                    discount_type: type,
                    discount_amount: amount,
                    expiry_date: expireDays,
                    products: selectedProducts,
                    visible: showOnStore
                },
                {headers: {'Authorization': await getTokenId()}});
            return response;
        } catch (error) {
            return error.response.data
        }
    },
    getAllCouponsByStore: async function (store) {

        try {
            const response = await axiosInstance.get(BASE_URL + `/coupons`,
                {headers: {'Authorization': await getTokenId()}});
            return response.data;
        } catch (error) {
            console.log(error)
            return error.response.data
        }
    },
    deleteCoupon: async function (coupon_id) {
        try {
            const response = await axios.delete(BASE_URL + `/coupons/${coupon_id}`,
                {headers: {'Authorization': await getTokenId()}});
            return response.data;
        } catch (error) {
            return error.response.response
        }
    },
    applyCoupon: async function (coupon, products) {
        try {
            return (await axios.post(BASE_URL + `/coupons/apply`, {coupon: coupon, products: products})).data
        } catch (e) {
            console.log(e)
        }
    },
    getCouponsById: async function (id) {

        try {
            const response = await axiosInstance.get(BASE_URL + `/coupons/${id}`,
                {headers: {'Authorization': await getTokenId()}});
            return response.data;
        } catch (error) {
            console.log(error)
            return error.response.data
        }
    },

}
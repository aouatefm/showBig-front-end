import axios from 'axios'
import {BASE_URL} from './config'
import {getTokenId} from "../firebase/auth";

export default {
    getProductList: async function () {
        try {
            const response = await axios.get(BASE_URL + '/products');
            return response.data;
        } catch (error) {
            return error
        }
    },
    getProductById: async function (id) {
        try {
            const response = await axios.get(BASE_URL + `/products/${id}`);
            return response.data;
        } catch (error) {
            return error
        }
    },
    getProductsByStore: async function (id) {
        try {
            //const response = await axios.get(BASE_URL + `/products/store/Cactus`);
             const response = await axios.get(BASE_URL + `/products/store/${id}`);
            return response.data;

        } catch (error) {
            return error
        }
    },

    productRecommendations: async function (id) {
        try {
            const response = await axios.get(BASE_URL + `/products/${id}/recommendations`,{headers: {'Authorization': await getTokenId()}});
            return response.data;
        } catch (error) {
            return error.response
        }
    },

    addProduct: async function (name,price,shipping,category,stock,ptype,imageUrl,description) {
        try {
            const response = await axios.post(BASE_URL + `/products`,
                {name:name,price:price,images:imageUrl,description:description,shipping_price:shipping,category:category,stock:stock,product_type:ptype},
                {headers: {'Authorization': await getTokenId()}});
            return response.data;
        } catch (error) {
            return error
        }
    },
    editProduct: async function (name,price,shipping,category,stock,ptype,imageProdUrl,description,video,uid) {
        try {
            return await axios.put(BASE_URL + `/products/${uid}`,
                {name:name,
                    price:price,
                    shipping_price:shipping,
                    category:category,
                    stock:stock,
                    product_type:ptype,
                    images:imageProdUrl,
                    description:description,
                    video:video},
                {headers: {'Authorization': await getTokenId()}});

        } catch (error) {
            return error.response
        }
    },



}
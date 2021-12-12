import axios from 'axios';

const firebaseURLPrefix = 'https://firebasestorage.googleapis.com/v0/b/viecommerce.appspot.com/o/';
const firebaseAssetImagesLocation = 'assets%2Fimages%2F';
const firebaseMediaQuery = '?alt=media';
export const stripeKey = 'pk_test_51K4mOzGxVyiAfW1lpVqRZWyIltm4osOlvQjHW3qxVv9DYapGs0f4vJ5Pb60jFPs3L6hRxRj9ZwOgKsZ00rao2GA500wmZZku9d'

export const axios_instance = axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL: 'https://viggs-backend.herokuapp.com',
});

export const fireBaseMediaURL = (imageName) => {
    return (
        `${firebaseURLPrefix}${firebaseAssetImagesLocation}${imageName}${firebaseMediaQuery}`
    );
}
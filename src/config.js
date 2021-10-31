import axios from 'axios';

const firebaseURLPrefix = 'https://firebasestorage.googleapis.com/v0/b/viecommerce.appspot.com/o/';
const firebaseAssetImagesLocation = 'assets%2Fimages%2F';
const firebaseMediaQuery = '?alt=media';


export const axios_instance = axios.create({
    // baseURL: 'http://localhost:5000',
    baseURL: 'https://viggs-backend.herokuapp.com',
});

export const fireBaseMediaURL = (imageName) => {
    return (
        `${firebaseURLPrefix}${firebaseAssetImagesLocation}${imageName}${firebaseMediaQuery}`
    );
}
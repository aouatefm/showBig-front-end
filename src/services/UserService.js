import axios from 'axios'
import {BASE_URL} from './config'

export default {
    getUser : async function(id){
        try{
            const  response = await axios.get(BASE_URL+'/user/'+id);
            return response.data;
        }
        catch (error)
        {throw error}
    },
    getUserList : async function(){
        try{
            const  response = await axios.get(BASE_URL+'/users/');
            return response.data;
        }
        catch (error)
        {throw error}
    }
}
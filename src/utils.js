import {toast} from "react-toastify";
import {auth} from "./firebase/firebase";
import {useEffect, useState} from "react";
import UserService from "./services/UserService";
import Moment from "moment";

export const formatPrice = (x, currency) => {
    switch (currency) {
        case '$':
            return x
            // return x.toFixed(2).replace('.', ',');
        default:
            return x
            // return x.toFixed(2);
    }
};

// export const productsAPI = 'https://react-shopping-cart-67954.firebaseio.com/products.json';

export const userRole = (user) => {
  if (user.store_id)
  {
      return 'vendor'
  }
 else
     return user.role
};

export const vendorStore = async (profile) => {
   const storeName = await profile.store_id
    return storeName
};

export const orderStatus = (status) =>{
    let statusTag = 'info';

    if (status === 'completed')
    {
        statusTag = 'success'
    }
    if (status === 'processing')
    {
        statusTag = 'warning'
    }
    if (status === 'canceled')
    {
        statusTag = 'danger'
    }

    return statusTag

}


export const UserProfile = async (uid) => {
        const profile = await UserService.getUser(uid)
    console.log(profile)
    return profile
};



export function dateDiffInDays(date) {
    const now = Moment(new Date());
    const end = Moment(date);
    const duration = Moment.duration(now.diff(end));
    const days = duration.asDays();
    return days;
}
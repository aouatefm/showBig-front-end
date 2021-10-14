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

export const ReduceOrderId = async (id) => {
    const substring1 = id. substring(0,4);
    const substring2 = id.substr(id.length - 4);
    const res = substring1.concat(substring2);
    return res

};
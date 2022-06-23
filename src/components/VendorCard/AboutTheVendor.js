import React, {useEffect, useState} from 'react';
import VendorService from "../../services/VendorService";
import VendorCard from "../VendorCard/VendorCard";

function useStoreId(id) {
    const [store, setStore] = useState(null);
    useEffect(async () => {
        const newStore = await VendorService.getVendorById(id);
        setStore(newStore);
    }, [])
    return store
}
const AboutTheVendor =  ({store}) => {
    const vendor = useStoreId(store)



    return (

        <div>
            {vendor && <>
                {/*<p>{store}</p>*/}
                {/*<p>{vendor.address}</p>*/}
                {/*<p>{vendor.description}</p>*/}
                {/*<p>{vendor.is_active}</p>*/}

                <VendorCard vendor={vendor}/>
            </>}

        </div>


    );
}

export default AboutTheVendor;

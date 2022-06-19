import React, {useEffect, useState} from 'react';
import VendorService from "../../services/VendorService";
import VendorCard from "../VendorCard/VendorCard";
import ProductService from "../../services/ProductService";
import ProductGrid from "./ProductGrid";

function useStoreProds(id) {
    const [prods, setProds] = useState([]);
    useEffect(async () => {
        const newProds = await ProductService.getProductsByStore(id);
        setProds(newProds);
    }, [])
    return prods
}
const MoreProducts =  ({store}) => {
    const prods = useStoreProds(store)



    return (

        <div>
            {prods && <>
                <ProductGrid products={prods}/>
            </>}

        </div>


    );
}

export default MoreProducts;
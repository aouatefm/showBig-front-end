import React, {useEffect, useState} from 'react';
import VendorService from "../../services/VendorService";
import VendorCard from "../VendorCard/VendorCard";
import ProductService from "../../services/ProductService";
import ProductGrid from "./ProductGrid";
import {Link} from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";

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

    const arrayChunk = (arr, n) => {
        const array = arr.slice();
        const chunks = [];
        while (array.length) chunks.push(array.splice(0, n));
        return chunks;
    };

    return (

        <div>
            <h1 style={{
                margin: '25px',
                padding: "5px",
                textAlign: 'center',
                letterSpacing: '8px',
                textTransform: 'uppercase',
            }}>More items from the same seller</h1>
            {prods && <>
                {arrayChunk(prods, 5).map((row, i) => (
                    <div key={i} className="row mx-auto">
                        {row.map((product, i) => (
                            <Link to={{ pathname: `/products/${product.id}`}}>
                                <ProductCard key={product.id} product={product} />
                            </Link>
                        ))}
                    </div>
                ))}
            </>}

        </div>


    );
}

export default MoreProducts;
import React, {Component} from 'react';
import ProductCard from "./ProductCard";

const ProductRecommendationsPresentation = ({product}) => {
    console.log("ProductRecommendationsPresentation")
      return (
            <>
                {product &&

                    product.map(vendor => (
                        <div key={vendor.id}><ProductCard vendor={vendor} /></div>
                    ))

                    }

            </>
        );
}

export default ProductRecommendationsPresentation;
import React from 'react';
import './ProductCardList.scss'
import ReactStars from "react-rating-stars-component";
import Button from "react-bootstrap/Button";
import {formatPrice} from "../../utils";


const ProductCardList = ({ product }) => {
    let price = product.price
    let formattedPrice = formatPrice(price, "$");
        return (
            <div className="download-cards" data-view="list-view">
            <div className="download-card" data-view="list-view">
                <img src={product.images} alt={product.name}
                     className="download-card__image" style={{maxWidth: "200px",maxHeight :"200px"}}
                     />
                <div className="download-card__content">
                    <header>
                        <span>{product.price}$</span>
                        <div className="download-card__category">{product.store_id}</div>
                        <h6 className="download-card__title">{product.name.toUpperCase()} {product.price}</h6>
                        <p className="download-card__description"><ReactStars {...{size: 30, value: 3, edit: false}} /></p>
                    </header>
                    <footer>
                        {/*<i className="fa fa-cloud-download"/><span>Download</span></footer>*/}
                    <Button className="shelf-item__buy-btn">Add to cart</Button></footer>

                </div>
            </div>
            </div>
        );

}

export default ProductCardList;
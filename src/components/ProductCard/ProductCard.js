import React from 'react';
import './ProductCard.scss';
import ReactStars from "react-rating-stars-component/dist/react-stars";
import {formatPrice} from "../../utils";
import "./ProductCard.scss"
import Button from "react-bootstrap/Button";
const card = ({ product }) => {
    let price = product.price
    let formattedPrice = formatPrice(price, "$");
return (
    <div className="shelf-item"
        // onClick={() => addProduct(product)}
         >
        {! product.shipping_price &&
        <div className="shelf-stopper">Free shipping</div>}
        <img classes="shelf-item__thumb" src={product.images} alt={product.name} style={{maxWidth :"180px",maxHeight :"110px"}}/>
        <p className="shelf-item__title">{product.name}</p>
        <a href="#">{product.store_id}</a>
        <div className="shelf-item__price">
            <div className="val">
                <small>$</small>
                <b>{price}</b>
                <span>{.05}</span>

                <div className="val-rating"><ReactStars {...{size: 30, value: 3, edit: false}} /></div>
            </div>
        </div>
        <Button className="shelf-item__buy-btn">Add to cart</Button>
        {/*<div className="shelf-item__buy-btn">Add to cart</div>*/}
    </div>
);
};

export default card;
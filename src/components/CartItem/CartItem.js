import React from 'react';

import './CartItem.css';
import {MinusIcon, PlusIcon, TrashIcon} from "../../assets/icons";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {addItem, removeItem} from "../../redux/cart/cart-action";

const CartItem = ({product ,addItem, removeItem }) => {
    return (
        <div className="row no-gutters py-2">
            <div className="col-sm-2 p-2">
                <img
                    alt={product.name}
                    style={{margin: "0 auto", maxHeight: "50px"}}
                    src={product.images} className="img-fluid d-block"/>
            </div>
            <div className="col-sm-4 p-2">
                <h5 className="mb-1">{product.name}</h5>
                <p className="mb-1">Price: {product.price} </p>

            </div>
            <div className="col-sm-2 p-2 text-center ">
                <p className="mb-0">Qty: {product.quantity}</p>
            </div>
            <div className="col-sm-4 p-2 text-right">
                <button
                    onClick={() => addItem(product)}
                    className="btn btn-primary btn-sm mr-2 mb-1">
                    <PlusIcon width={"20px"}/>
                </button>

                {
                    product.quantity > 1 &&
                    <button
                        onClick={() => removeItem(product)}
                        className="btn btn-danger btn-sm mb-1">
                        <MinusIcon width={"20px"}/>
                    </button>
                }

                {
                    product.quantity === 1 &&
                    <button
                        onClick={() => removeItem(product)}
                        className="btn btn-danger btn-sm mb-1">
                        <TrashIcon width={"20px"}/>
                    </button>
                }

            </div>
        </div>
    )
};
const mapStateToProps = createStructuredSelector({

});
const mapDispatchToProps = dispatch => ({
    addItem: product => dispatch(addItem(product)),
    removeItem: product => dispatch(removeItem(product)),

});
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);

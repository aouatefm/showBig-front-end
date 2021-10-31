import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import './QuantityCell.css';
import {addItem, clearItem, removeItem} from "../../../redux/cart/cart-action";
import {TimesIcon} from "../../../assets/icons";

const QuantityCell = (props) => {
    return (
        <td className="quantity-cell">
            <Button
                className="minus-btn"
                variant="outline-dark"
                onClick={
                    props.item.quantity === 1
                        ? () => props.clearItem(props.item)
                        : () => props.removeItem(props.item)
                }
            >&#10094;</Button>
            {props.item.quantity}
            <Button
                className="plus-btn"
                variant="outline-dark"
                onClick={() => props.addItem(props.item)}
            >&#10095;
            </Button>

        </td>
    );
}

const mapDispatchToProps = (dispatch) => ({
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item)),
    clearItem: item => dispatch(clearItem(item)),
});


export default connect(null, mapDispatchToProps)(QuantityCell);
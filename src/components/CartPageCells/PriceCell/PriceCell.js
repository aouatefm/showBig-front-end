import React from 'react';
import './PriceCell.css';

const PriceCell = (props) => {
    return (
        <td className="price">$ {props.price.toFixed(2)}</td>
    );
}

export default PriceCell;
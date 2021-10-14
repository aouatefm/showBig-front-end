import React from 'react';

const SellerCell = (props) => {
    return (
        <td>
            <h5>{props.name}</h5>
            <p>
                Phone Number: {props.phone}
            </p>
            <p>
                Email address: {props.email}
            </p>
        </td>
    );
}

export default SellerCell;
import React from 'react';
import { Media } from 'react-bootstrap';

const ProductCell = (props) => {
    return (
        <td>
            <Media>
                <img
                    width={64}
                    height={64}
                    className="mr-5"
                    src={props.img_src}
                    alt="shoes placeholder"
                />
                <Media.Body>
                    <h5>{props.name}</h5>
                    <p>
                        Brief Description: {props.description}
                    </p>
                    <p>
                        Product ID#: {props.id}
                    </p>
                </Media.Body>
            </Media>
        </td>
    );
}

export default ProductCell;
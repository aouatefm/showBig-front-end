import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import OrderService from "../../services/OrderService";


function useOrderId(id) {
    const [order, setOrder] = useState(0);
    useEffect(async () => {
        const newOrder = await OrderService.getOrderById(id);
        setOrder(newOrder);
    }, [])
    return [order]
}
const CustomerOrderDetail = ({customerOrders}) => {
    let {id} = useParams();
    const order   = useOrderId(id)[0]
    const products = order.products
    console.log(products)
    return (
            <div className="container">
                <ul className="list-group">
                    <li className="list-group-item list-group-item-secondary" ><strong>Order# {order.order_id}</strong> &#8594; Order Items</li>
                    <li className="list-group-item">
                        <table className="table">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Item</th>
                                <th scope="col">Picture</th>
                                <th scope="col">Cost</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                products ?
                                    <>
                                        {products.map((product,index) => (
                                            <tr>
                                                <th scope="row">{index+1}</th>
                                                <td>{product.name}</td>
                                                <td><img src={product.images} alt={product.name} width="60px" height="60px"/></td>
                                                <td>{product.price}</td>
                                                <td>{product.quantity}</td>
                                                <td>{product.quantity * product.price}</td>
                                            </tr>
                                        ))
                                        }
                                    </> :
                                    <h6>Loading ...</h6>
                            }
                            </tbody>
                        </table>
                    </li>
                </ul>
            </div>
        );
    }


export default CustomerOrderDetail;
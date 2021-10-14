import React, {useState} from 'react';
import {useLocation} from "react-router";
import {orderStatus} from "../../utils";
import NavThree from "../NavBar/NavThree";
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";
import './VendorCustomersDetails.css'
const VendorCustomersDetails = ({props}) => {
    const location = useLocation()
    const orders = location.state.orders
    const [show, setShow] = useState(false);
    const [selectedProducts, setSelectedProducts] = React.useState([]);

    const handleClose = () => {
    setShow(false);
        setSelectedProducts([])}
    const handleShow = (prods) => {
            setSelectedProducts(prods)
            setShow(true);
    }
    return (

        <div>
            <div className="row">
                <div className="col col-lg-2">
                    <NavThree/>
                </div>
                <div className="col">
                    <h1>Orders</h1>
                    <table className="table table-hover table-striped" style={{width: "1000px"}}>
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Total products</th>
                            <th scope="col">.</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders &&
                        <>
                            {orders.map((order, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{order.order_date}</td>
                                    <td><span
                                        className={`badge badge-${orderStatus(order.status)}`}>{order.status}</span>
                                    </td>
                                    <td>{order.total_price} $</td>
                                    <td>{order.products.length}</td>
                                    <td>
                                        <Button variant="warning"
                                                onClick={()=>{
                                                    setShow(true)
                                                    setSelectedProducts(order.products)}}

                                                style={{marginBottom: "10px"}}>
                                            View Products Detail
                                        </Button>
                                        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered size="lg"
                                               className="modal-backdrop">
                                            <Modal.Header closeButton>
                                                <Modal.Title>Order Products Detail</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <table className="table table-borderless">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Image</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Store</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {selectedProducts &&
                                                    <>
                                                        {selectedProducts.map((product, index) => (
                                                            <tr >
                                                                <th scope="row">{index + 1}</th>
                                                                <td><img src={product.images} alt={product.name} className="avatar" width="50px" height="50px"/></td>
                                                                <td>{product.name}</td>
                                                                <td>{product.price} $</td>
                                                                <td>{product.quantity}</td>
                                                                <td>{product.store_id}</td>
                                                            </tr>
                                                        ))}
                                                    </>
                                                    }
                                                    </tbody>
                                                </table>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Cancel
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </td>
                                </tr>
                            ))}
                        </>
                        }
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}

export default VendorCustomersDetails;
import React, {useEffect, useState} from 'react';
import NavThree from "../NavBar/NavThree";
import {useParams} from "react-router-dom";
import OrderService from "../../services/OrderService";
import {ShippingIcon} from "../../assets/icons";
import StickyNotes from "./StickyNotes";
import UserService from "../../services/UserService";
import './OrderDetail.css'
import {orderStatus} from "../../utils";
import VendorService from "../../services/VendorService";
import {useToasts} from "react-toast-notifications";


const OrderDetail = (props) => {
    let {id} = useParams();
    const { addToast } = useToasts();
    const [order, setOrder] = useState(0);
    const [customer, setCustomer] = useState(0);
    const [order_status, setOrder_status] = useState(props.location.state.order.status);
    const [loading, setLoading] = useState(false)

    useEffect(async () => {
        setOrder(props.location.state.order);
        const newUser = await UserService.getUser(order.customer_id);
        setCustomer(newUser)
    }, [])

    const [editFormDisplayed, setEditFormDisplayed] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(props.location.state.order.status);

    const handleUpdate = async () => {
        setLoading(true)
       const response = await OrderService.UpdateOrder(id, selectedStatus)
        if (response.status === 200)
        {
            setOrder_status(selectedStatus)
            setLoading(false)
        }
        else {
            addToast(response.data.message,
                {
                    appearance: "error",
                    autoDismiss: true,
                    autoDismissTimeout: 1500,
                });
            setLoading(false)
        }
        setEditFormDisplayed(false)
    }

    const products = order.products
    return (
        <div>
            <div className="row">
                <div className="col col-lg-2">
                    <NavThree/>
                </div>
                <div className="col">
                    <div className="row">
                        <div className="col-6" style={{marginTop: '100px'}}>
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-secondary">
                                    <strong>Order# {order.order_id}</strong> &#8594; Order Items
                                </li>
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
                                                    {products.map((product, index) => (
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{product.name.toUpperCase()}</td>
                                                            <td><img src={product.images} alt={product.name}
                                                                     width="60px" height="60px"/></td>
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
                                <li className="list-group-item"><ShippingIcon width="25"/>
                                    {order.delivery === 0 ? <span>  Local pickup</span> :
                                        <span>Regular Shipping </span>}

                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item" style={{marginLeft: "300px"}}>Discount [?] :
                                        </li>
                                        <li className="list-group-item" style={{marginLeft: "300px"}}>Shipping [?]
                                            : {order.delivery === 0 ? <span style={{color: "#058c42"}}>Free</span> :
                                                <span>{order.delivery} $ </span>}</li>
                                        <li className="list-group-item" style={{marginLeft: "300px"}}>Order Total
                                            : {order.total_price} $
                                        </li>
                                        <li className="list-group-item" style={{marginLeft: "300px"}}>Refunded :</li>
                                    </ul>
                                </li>
                                <ul className="list-group list-group-horizontal">
                                    <li className="list-group-item list-group-item-secondary" style={{width: "50%"}}>
                                        <strong>Billing Address</strong></li>
                                    <li className="list-group-item list-group-item-secondary" style={{width: "50%"}}>
                                        <strong>Shipping Address</strong></li>
                                </ul>
                                <ul className="list-group list-group-horizontal">
                                    <li className="list-group-item " style={{
                                        width: "50%",
                                        textAlign: "center"
                                    }}>{order.billing_adr ? order.billing_adr : <>&#9866;</>}</li>
                                    <li className="list-group-item " style={{
                                        width: "50%",
                                        textAlign: "center"
                                    }}>{order.shipping_adr ? order.shipping_adr : <>&#9866;</>}</li>
                                </ul>

                            </ul>
                        </div>
                        <div className="col-4" style={{marginTop: '100px'}}>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item list-group-item-secondary"><strong>General
                                    Details</strong></li>
                                <li className="list-group-item">
                                    Order Status : <span
                                   // className={`badge badge-${orderStatus(order.status)}`}>{order.status}</span>
                                    className={`badge badge-${orderStatus(order_status)}`}>{order_status}</span>
                                    <span onClick={() => {
                                        setEditFormDisplayed(!editFormDisplayed)
                                    }} className="edit-status">
                                        <small style={{margin: '10px', color: 'orange'}}>Edit</small></span>
                                    {loading &&
                                    <div className="spinner-border text-primary" role="status" style={{width :"20px",height :'20px'}}>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                        }
                                    <br/>
                                    {editFormDisplayed &&
                                    <>
                                        <select className="form-select" aria-label="Default select example"
                                                onChange={(e) => {
                                                    setSelectedStatus(e.target.value)
                                                }}>
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="completed">Completed</option>
                                            <option value="canceled">Canceled</option>
                                        </select><br/>
                                        <button type="button" className="btn btn-success btn-sm"
                                                style={{margin: '10px'}} onClick={handleUpdate}>Update
                                        </button>
                                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => {
                                            setEditFormDisplayed(false)
                                        }}>Cancel
                                        </button>
                                    </>
                                    }
                                </li>

                                <li className="list-group-item">Order Date : {order.order_date}</li>
                                <li className="list-group-item">Customer : {customer.display_name}</li>
                                <li className="list-group-item">Email : {customer.email}</li>
                                <li className="list-group-item">Phone &#10102; : {order.contact_number}</li>
                                <li className="list-group-item">Phone &#10103; :</li>
                            </ul>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item list-group-item-secondary"><strong>Order Notes</strong>
                                </li>
                                <StickyNotes notes={order.notes}/>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetail

















































// function useOrderId(id) {
//     const [order, setOrder] = useState(0);
//     const [customer, setCustomer] = useState(0);
//     useEffect(async () => {
//         console.log("called ...")
//         const newOrder = await OrderService.getOrderById(id);
//         setOrder(newOrder);
//         const newUser = await UserService.getUser(newOrder.customer_id);
//         setCustomer(newUser)
//     }, [])
//     return [order, customer]
// }
//
// const OrderDetail = ({props}) => {
//     let {id} = useParams();
//     console.log("id")
//     console.log(id)
//     const [order, customer] = useOrderId(id)
//     const [editFormDisplayed, setEditFormDisplayed] = useState(false);
//     const [selectedStatus, setSelectedStatus] = useState(order.status);
//     const handleUpdate = async () => {
//         OrderService.UpdateOrder(id, selectedStatus).then(res =>{
//             console.log(res)
//             }
//
//         )
//         console.log("res")
//         console.log("res")
//         setEditFormDisplayed(false)
//     }
//
//     const products = order.products
//     return (
//         <div>
//             <div className="row">
//                 <div className="col col-lg-2">
//                     <NavThree/>
//                 </div>
//                 <div className="col">
//                     <div className="row">
//                         <div className="col-6" style={{marginTop: '100px'}}>
//                             <ul className="list-group">
//                                 <li className="list-group-item list-group-item-secondary">
//                                     <strong>Order# {order.order_id}</strong> &#8594; Order Items
//                                 </li>
//                                 <li className="list-group-item">
//                                     <table className="table">
//                                         <thead className="thead-dark">
//                                         <tr>
//                                             <th scope="col">#</th>
//                                             <th scope="col">Item</th>
//                                             <th scope="col">Picture</th>
//                                             <th scope="col">Cost</th>
//                                             <th scope="col">Qty</th>
//                                             <th scope="col">Total</th>
//                                         </tr>
//                                         </thead>
//                                         <tbody>
//                                         {
//                                             products ?
//                                                 <>
//                                                     {products.map((product, index) => (
//                                                         <tr>
//                                                             <th scope="row">{index + 1}</th>
//                                                             <td>{product.name.toUpperCase()}</td>
//                                                             <td><img src={product.images} alt={product.name}
//                                                                      width="60px" height="60px"/></td>
//                                                             <td>{product.price}</td>
//                                                             <td>{product.quantity}</td>
//                                                             <td>{product.quantity * product.price}</td>
//                                                         </tr>
//                                                     ))
//                                                     }
//                                                 </> :
//                                                 <h6>Loading ...</h6>
//                                         }
//                                         </tbody>
//                                     </table>
//                                 </li>
//                                 <li className="list-group-item"><ShippingIcon width="25"/>
//                                     {order.delivery === 0 ? <span>  Local pickup</span> :
//                                         <span>Regular Shipping </span>}
//
//                                     <ul className="list-group list-group-flush">
//                                         <li className="list-group-item" style={{marginLeft: "300px"}}>Discount [?] :
//                                         </li>
//                                         <li className="list-group-item" style={{marginLeft: "300px"}}>Shipping [?]
//                                             : {order.delivery === 0 ? <span style={{color: "#058c42"}}>Free</span> :
//                                                 <span>{order.delivery} $ </span>}</li>
//                                         <li className="list-group-item" style={{marginLeft: "300px"}}>Order Total
//                                             : {order.total_price} $
//                                         </li>
//                                         <li className="list-group-item" style={{marginLeft: "300px"}}>Refunded :</li>
//                                     </ul>
//                                 </li>
//                                 <ul className="list-group list-group-horizontal">
//                                     <li className="list-group-item list-group-item-secondary" style={{width: "50%"}}>
//                                         <strong>Billing Address</strong></li>
//                                     <li className="list-group-item list-group-item-secondary" style={{width: "50%"}}>
//                                         <strong>Shipping Address</strong></li>
//                                 </ul>
//                                 <ul className="list-group list-group-horizontal">
//                                     <li className="list-group-item " style={{
//                                         width: "50%",
//                                         textAlign: "center"
//                                     }}>{order.billing_adr ? order.billing_adr : <>&#9866;</>}</li>
//                                     <li className="list-group-item " style={{
//                                         width: "50%",
//                                         textAlign: "center"
//                                     }}>{order.shipping_adr ? order.shipping_adr : <>&#9866;</>}</li>
//                                 </ul>
//
//                             </ul>
//                         </div>
//                         <div className="col-4" style={{marginTop: '100px'}}>
//                             <ul className="list-group list-group-flush">
//                                 <li className="list-group-item list-group-item-secondary"><strong>General
//                                     Details</strong></li>
//                                 <li className="list-group-item">
//                                     Order Status : <span
//                                     className={`badge badge-${orderStatus(order.status)}`}>{order.status}</span>
//                                     <span onClick={() => {
//                                         setEditFormDisplayed(!editFormDisplayed)
//                                     }} className="edit-status"><small
//                                         style={{margin: '10px', color: 'orange'}}>Edit</small></span><br/>
//                                     {editFormDisplayed &&
//                                     <>
//                                         <select className="form-select" aria-label="Default select example"
//                                                 onChange={(e) => {
//                                                     setSelectedStatus(e.target.value)
//                                                 }}>
//                                             <option value="pending">Pending</option>
//                                             <option value="processing">Processing</option>
//                                             <option value="completed">Completed</option>
//                                             <option value="canceled">Canceled</option>
//                                         </select><br/>
//                                         <button type="button" className="btn btn-success btn-sm"
//                                                 style={{margin: '10px'}} onClick={handleUpdate}>Update
//                                         </button>
//                                         <button type="button" className="btn btn-secondary btn-sm" onClick={() => {
//                                             setEditFormDisplayed(false)
//                                         }}>Cancel
//                                         </button>
//                                     </>
//                                     }
//                                 </li>
//
//                                 <li className="list-group-item">Order Date : {order.order_date}</li>
//                                 <li className="list-group-item">Customer : {customer.display_name}</li>
//                                 <li className="list-group-item">Email : {customer.email}</li>
//                                 <li className="list-group-item">Phone &#10102; : {order.contact_number}</li>
//                                 <li className="list-group-item">Phone &#10103; :</li>
//                             </ul>
//                             <ul className="list-group list-group-flush">
//                                 <li className="list-group-item list-group-item-secondary"><strong>Order Notes</strong>
//                                 </li>
//                                 <StickyNotes notes={order.notes}/>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
//
// export default OrderDetail
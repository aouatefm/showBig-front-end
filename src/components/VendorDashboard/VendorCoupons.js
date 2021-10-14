import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavThree from "../NavBar/NavThree";

    const VendorCoupons =  () => {
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        return (
            <div >
                <div className="row">
                    <div className="col col-lg-2" >
                        <NavThree/>
                    </div>
                    <div className="col" >
                        <h1>Coupons</h1>
                        <div style={{position : "relative" , left: "953px" }}>
                            <Button variant="warning" onClick={handleShow} style={{marginBottom :"10px"}}>
                                Add New Coupon
                            </Button>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Order Products Detail</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <table className="table table-borderless">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cancel
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <table className="table table-warning table-striped">
                            <thead>
                            <tr>
                                <th scope="col">Code</th>
                                <th scope="col">Coupon type	</th>
                                <th scope="col">Coupon amount</th>
                                <th scope="col">Product IDs	</th>
                                <th scope="col">Usage/Limit</th>
                                <th scope="col">Expiry date</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        );
}

export default VendorCoupons;
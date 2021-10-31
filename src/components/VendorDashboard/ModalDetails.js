import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import {Modal} from "react-bootstrap";

const ModalDetails = ({ products }) => {
    console.log("ModalDetails")
    console.log(products)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
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
                <Button variant="secondary" onClick={handleShow}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalDetails ;
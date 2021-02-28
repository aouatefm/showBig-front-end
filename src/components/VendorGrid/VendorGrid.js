import { Col,Pagination, Row} from "react-bootstrap";
import React from "react";
import VendorCard from "../VendorCard/VendorCard";
import './VendorGrid.css'
const VendorGrid = (props) => (
    <div className="container">
        <Row className="grid">
            <Col lg={4} ><VendorCard /></Col>
            <Col lg={4} ><VendorCard /></Col>
            <Col lg={4} ><VendorCard /></Col>
            <Col lg={4} ><VendorCard /></Col>
            <Col lg={4} ><VendorCard /></Col>
            <Col lg={4} ><VendorCard /></Col>
            <Col lg={4} ><VendorCard /></Col>
            <Col lg={4} ><VendorCard /></Col>
            <Col lg={4} ><VendorCard /></Col>
            <Col lg={4} ><VendorCard /></Col>
        </Row>
        <Row>
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Ellipsis />

                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Item>{11}</Pagination.Item>
                <Pagination.Item active>{12}</Pagination.Item>
                <Pagination.Item>{13}</Pagination.Item>
                <Pagination.Item disabled>{14}</Pagination.Item>

                <Pagination.Ellipsis />
                <Pagination.Item>{20}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </Row>
    </div>
);

export default VendorGrid;
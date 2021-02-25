import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SideBar from '../../components/SideBar/SideBar';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import "./ProductPage.css";


const ProductPage = () => {
    return (
        <Row className="productpage">
            <Col lg={4}>
                <div className="sidebar">
                    <SideBar/>
                </div>
            </Col>
            <Col lg={8} className="products">
                <ProductGrid/>
            </Col>
        </Row>
    );
};

export default ProductPage;
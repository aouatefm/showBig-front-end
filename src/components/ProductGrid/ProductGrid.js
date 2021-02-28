import React from 'react';
import Card from '../Card/Card';
import { Row, Col, Pagination, InputGroup, FormControl, Button } from 'react-bootstrap';

import './ProductGrid.css';


const Grid = (props) => (
    <div className="container">
            <Row>
                    <InputGroup className="search-bar">
                            <FormControl
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                    <Button variant="outline-secondary">Search</Button>
                            </InputGroup.Append>
                    </InputGroup>
            </Row>
    <Row className="grid">
        <Col lg={3.5} ><Card img="https://target.scene7.com/is/image/Target/GUEST_acf7e487-009f-4c9f-afc0-b62da7261c92?wid=488&hei=488&fmt=pjpeg"/></Col>
        <Col lg={3.5} ><Card img="https://target.scene7.com/is/image/Target/GUEST_acf7e487-009f-4c9f-afc0-b62da7261c92?wid=488&hei=488&fmt=pjpeg"/></Col>
        <Col lg={3.5} ><Card img="https://target.scene7.com/is/image/Target/GUEST_acf7e487-009f-4c9f-afc0-b62da7261c92?wid=488&hei=488&fmt=pjpeg"/></Col>
        <Col lg={3.5} ><Card img="https://target.scene7.com/is/image/Target/GUEST_acf7e487-009f-4c9f-afc0-b62da7261c92?wid=488&hei=488&fmt=pjpeg"/></Col>
        <Col lg={3.5} ><Card img="https://target.scene7.com/is/image/Target/GUEST_acf7e487-009f-4c9f-afc0-b62da7261c92?wid=488&hei=488&fmt=pjpeg"/></Col>
        <Col lg={3.5} ><Card img="https://target.scene7.com/is/image/Target/GUEST_acf7e487-009f-4c9f-afc0-b62da7261c92?wid=488&hei=488&fmt=pjpeg"/></Col>
        <Col lg={3.5} ><Card img="https://target.scene7.com/is/image/Target/GUEST_acf7e487-009f-4c9f-afc0-b62da7261c92?wid=488&hei=488&fmt=pjpeg"/></Col>
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

export default Grid;
import React from 'react';
import { Accordion, Card, Form } from 'react-bootstrap';

const CatBar = () => {
    return (
        <Card className="catbar">
            <Accordion.Toggle as={Card.Header} eventKey="0">
                Catagories
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <Form.Check type="checkbox" label="Men" />
                </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <Form.Check type="checkbox" label="Women" />
                </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <Form.Check type="checkbox" label="Kids" />
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
};

export default CatBar;
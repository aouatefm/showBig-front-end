import React from 'react';
import { Accordion, Card, Form } from 'react-bootstrap';

const ConditionBar = () => {
    return (
        <Card className="conditionbar">
            <Accordion.Toggle as={Card.Header} eventKey="3">
                Conditions
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
                <Card.Body>
                    <Form.Check type="checkbox" label="New" />
                </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="3">
                <Card.Body>
                    <Form.Check type="checkbox" label="Used" />
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
};

export default ConditionBar;
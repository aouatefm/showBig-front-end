import React, { useRef, useState } from 'react';
import { Container, Row, Col, Form, Button, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SellPage.css';

const SellPage = (props) => {
    const file = useRef(null);
    const [checked, setChecked] = useState(false)

    const handleFileChange = (event) => {
        file.current = event.target.files[0];
    }

    const handleChecked = (event) => {
        setChecked(event.target.checked);
    }

    let formInfo = (
        <>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control placeholder="John Doe" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="sample@email.com" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="12345 Woodward Ave" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control placeholder="Austin"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control placeholder="Texas"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>ZIP</Form.Label>
                    <Form.Control placeholder="92877"/>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="formCondition">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        as="select"
                        id="inlineFormCustomSelectPref"
                        custom
                    >
                        <option value="0">New</option>
                        <option value="1">Used</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formBug">
                    <FormLabel>Briefly Describe Conditions (Optional - Used Only)</FormLabel>
                    <Form.Control />
                </Form.Group>
            </Form.Row>
        </>
    );

    let formPics = (
        <>
            <Form.Row>
                <Form.Group as={Col} controlId="hop">
                    <Form.Label>Box</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
                <Form.Group as={Col} controlId="giay">
                    <Form.Label>Shoes + Nametag</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
                <Form.Group as={Col} controlId="mui">
                    <Form.Label>Front</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="de">
                    <Form.Label>Bottom</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
                <Form.Group as={Col} controlId="mong">
                    <Form.Label>Back</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
                <Form.Group as={Col} controlId="ngoai">
                    <Form.Label>Outside</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="trong">
                    <Form.Label>Inside</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
                <Form.Group as={Col} controlId="tem">
                    <Form.Label>Specs</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
                <Form.Group as={Col} controlId="lot">
                    <Form.Label>Imperfections (Used Only)</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
            </Form.Row>
        </>
    );

    return (
        <div className="sell-page">
            <img
                alt="background"
                className="background"
                src="assets/images/sell-page.jpg"
                style={{"position":"fixed", "zIndex":-1, objectFit:'cover', height: '100%', width: '100%'}}
            />
            <Container style={{alignItems:'center'}}>
                <Form>
                    <h1 className="mb-5">Sell With Us</h1>
                    {formInfo}
                    <h2>IMAGES OF THE SHOES (*)</h2>
                    {formPics}
                    <h2>PRICE $ (USD)</h2>
                    <Form.Control className="mb-5"/>
                    <Form.Check
                        type="checkbox"
                        id="default-checkbox"
                        label="By checking this box, you understand that we'll collect 5% of each transaction as service fee"
                        style={{textAlign:'center'}}
                        onChange={handleChecked}
                    />
                    <Button
                        className="mt-4"
                        variant="primary"
                        type="submit"
                        style={{float:'right'}}
                        size="lg"
                        disabled={!checked}
                    >
                        Submit
                    </Button>
                </Form>
                <Link to="/image-standards"><h6>(*) Click here to see our standards!</h6></Link>
            </Container>
        </div>
    );
};

export default SellPage;
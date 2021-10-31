import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import StandardCard from './StandardCard';
import './ImageStandard.css';

export default class ImageStandard extends Component {
    render() {
        return (
            <Container className="image-standard">
                <h1 className ="first-line text-center" style={{color:'black'}}>
                    MAKE SURE YOUR UPLOADS
                </h1>
                <h1 className ="text-center" style={{color:'gray'}}>
                    INCLUDE THE FOLLOWING THINGS
                </h1>
                <Row>
                    <StandardCard
                        title="1. Box"
                        img="assets/images/how-to-sell/standard/box.jpg"/>
                    <StandardCard
                        title="2. Nametag"
                        img="assets/images/how-to-sell/standard/nametag.jpg"/>
                </Row>
                <Row>
                    <StandardCard
                        title="3. Front"
                        img="assets/images/how-to-sell/standard/mui.jpg"/>
                    <StandardCard
                        title="4. Bottom"
                        img="assets/images/how-to-sell/standard/de.jpg"/>
                </Row>
                <Row>
                    <StandardCard
                        title="5. Back"
                        img="assets/images/how-to-sell/standard/dit.jpg"/>
                    <StandardCard
                        title="6. Outside"
                        img="assets/images/how-to-sell/standard/ngoai.jpg"/>
                </Row>
                <Row>
                    <StandardCard
                        title="7. Inside"
                        img="assets/images/how-to-sell/standard/trong.jpg"/>
                    <StandardCard
                        title="8. Specs"
                        img="assets/images/how-to-sell/standard/tem.jpg"/>
                </Row>
                <Row>
                    <StandardCard
                        title="9. Imperfections"
                        img="assets/images/how-to-sell/standard/khiemkhuyet.jpg"/>
                </Row>
            </Container>
        )
    }
}
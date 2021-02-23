import React from 'react';
import { Carousel } from 'react-bootstrap';
import "./Carousel.css";

const carouselSlider = (props) => (
    <Carousel>
        <Carousel.Item>
            <img
                className="d-block w-100 cover"
                src="https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                height="600px"
                alt="First slide"
            />
            <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100 cover"
                src="data:image/jpeg;base64,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"
                height="600px"
                alt="Third slide"
            />
            <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100 cover"
                src="https://5.imimg.com/data5/GX/CA/GLADMIN-1242044/nature-jpg-500x500.jpeg"
                height="600px"
                alt="Third slide"
            />
            <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
);

export default carouselSlider;
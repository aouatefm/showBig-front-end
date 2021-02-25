import React from 'react';
import { Carousel } from 'react-bootstrap';
import "./Carousel.css";

const carouselSlider = (props) => (
    <Carousel >
        <Carousel.Item>
            <img
                className="d-block w-100 cover"
                src="https://www.pxwall.com/wp-content/uploads/2019/04/4K-UHD-iphone-Wallpaper.jpg"
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
                src="https://cdnb.artstation.com/p/assets/images/images/020/537/343/large/agentough-10-nfsh-4k-wp-1.jpg?1568162352"
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
                src="https://www.pxwall.com/wp-content/uploads/2018/03/4K-Desktop-Wallpapers-3840x2160.jpg"
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
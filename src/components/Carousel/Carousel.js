import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { fireBaseMediaURL } from '../../config';

import "./Carousel.css";


const CarouselSlider = (props) => (
    <Carousel className="home-carousel"  >
        <Carousel.Item>
            <img
                className="d-block w-100 cover"
                src={ fireBaseMediaURL('shoes-img%2Fshoes-cover-1.jpg') }
                height="600px"
                alt="First slide"
                style={{maxWidth :"300px"}}
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100 cover"
                src={ fireBaseMediaURL('shoes-img%2Fshoes-cover-2.jpg') }
                height="600px"
                alt="Third slide"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100 cover"
                src={ fireBaseMediaURL('shoes-img%2Fshoes-cover-3.jpg') }
                height="600px"
                alt="Third slide"
            />
        </Carousel.Item>
    </Carousel>

);

export default CarouselSlider;
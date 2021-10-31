import React, {useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import ArrowLeft from "@material-ui/icons/ArrowLeft";
import ArrowRight from "@material-ui/icons/ArrowRight";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SlickCarousel.css";
import ProductCard from "../ProductCard/ProductCard";
import ProductService from "../../services/ProductService";


const  useProducts = () =>{
    const [products, setProducts] = useState([]);
    useEffect(async() => {
        const newProducts = await ProductService.getProductList()
        setProducts(newProducts);
    }, [])
    return products
}
const SlickCarousel = (props) => {
    const settings = {
        infinite: false,
        centerPadding: '0',
        slidesToShow: (props.size === 'large' ? 3 : 4),
        swipeToSlide: true,
        dots: true,
        pauseOnHover: true,
        autoplay: true,
        speed: 300,
        nextArrow: <ArrowRight/>,
        prevArrow: <ArrowLeft/>,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 765,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 2,
                    arrows: false,
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                }
            }
        ]
    }
    const products = useProducts()

    return (
        <Container>
            {/*<h3 className="style mb-3" onClick = {() => props.history.push("/")}>*/}
            {/*    {props.name}*/}
            {/*</h3>*/}
            {/*{*/}
            {/*    products &&*/}
            {/*    <Slider {...settings} className="slider-carousel">*/}
            {/*        {products.slice(0, 7).map(*/}
            {/*            product => <ProductCard key={product.id} product={product}/>*/}
            {/*        )}*/}
            {/*    </Slider>*/}
            {/*}*/}

        </Container>
    )
}


export default SlickCarousel;
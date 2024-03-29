import React, {useEffect, useState} from 'react';
import SlickCarousel from "../components/SlickCarousel/SlickCarousel";
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CategoriesService from "../services/CategoriesService"; // requires a loader
import './Home.css'
import SpinnerPage from "./Spinner/SpinnerPage";
import garden from '../assets/garden.png'
import useReactRouter from 'use-react-router';

const useCategories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(async () => {
        CategoriesService.getCategoriesList().then(cat => {
            setCategories(cat.data);
        })
    }, [])
    return categories
}
const Home = (props) => {
    const categories = useCategories()
    const {history} = useReactRouter();
    const [category, setCategory] = useState(null);

    const searchProductPerCat = async (cat) => {
        await setCategory(cat)
        const urlEncodedCategory = encodeURI(category);
        history.push(`/product-listing?find_cat=Electronic`);
    }

    return(
    <div role="main" style={{marginTop :"30px" }}>
        {categories ?
        <div className="container" >
            <div className="row" style={{backgroundColor :"#f5f5f5"}} >
                <div className="col-sm-4" style={{marginTop :"20px"}}>
                    <ul className="list-group" style={{width:"auto"}} >
                        {
                            categories &&
                            <>
                                {categories.map(category => (
                                    <li className="list-group-item cat-name" key={category.id} style={{cursor :"pointer"}} >{category.name} </li>
                                ))}
                            </>
                        }
                    </ul>
                </div>
                <div className="col-sm-8" style={{marginTop :"20px"}}>
                    <Carousel autoPlay>
                        <div>
                            <img src="https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171__340.jpg" alt=""/>
                        </div>
                        <div>
                            <img
                                src="https://st.depositphotos.com/1428083/2946/i/600/depositphotos_29460297-stock-photo-bird-cage.jpg" alt=""/>
                        </div>
                        <div>
                            <img src="https://wowslider.com/sliders/demo-27/data1/images/hotair1373167.jpg" alt=""/>
                        </div>
                    </Carousel>
                </div>
            </div>
            {/*<SlickCarousel*/}
            {/*    size="large"*/}
            {/*    name="BEST OFFERS"*/}
            {/*/>*/}
            {/*<SlickCarousel*/}
            {/*    size="large"*/}
            {/*    name="NEW RELEASE"*/}
            {/*/>*/}
            {/*<SlickCarousel*/}
            {/*    size="small"*/}
            {/*    name="BEST SELLERS"*/}
            {/*/>*/}

        </div>
            : <SpinnerPage/>}
    </div>
    );
}

export default Home;
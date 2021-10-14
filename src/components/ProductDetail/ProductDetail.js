import React, {useEffect, useState} from 'react';
import './ProductDetail.css'
import {Breadcrumb, Col, ProgressBar, Row, Tab, Table, Tabs} from "react-bootstrap";
import ProductService from "../../services/ProductService";
import {useParams} from 'react-router-dom';
import {connect} from "react-redux";
import {setLoading} from "../../redux/spinner/spinner-actions";
import {addItem} from "../../redux/cart/cart-action";
import {selectCartItems} from "../../redux/cart/cart-selectors";
import {createStructuredSelector} from "reselect";
import ReactStars from "react-rating-stars-component";
import RatingService from "../../services/RatingService";

function useProductId(id) {
    const [product, setProduct] = useState([]);
    const [ratings, setRating] = useState([]);
    useEffect(async () => {
        const newProduct = await ProductService.getProductById(id);
        setProduct(newProduct);
        const newRating = await RatingService.getRatingsOfProduct(id);
        setRating(newRating)
    }, [])
    return [product, ratings]
}

const ProductDetail = (props) => {
    let {id} = useParams();
    const [product, product_ratings] = useProductId(id);
    const ratingAVG = product_ratings.avg
    // const ratingChanged = (newRating) => {
    //     setEdit(false)
    // };
    const now = 60
    return ratingAVG != undefined ?
        <div className="container">
            <div className="row">
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">
                            Dashboard
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="#">
                            Profile
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                            Details
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="col">
                    <img src={product.images} alt={product.name} style={{maxHeight: "550px", maxWidth: "300px"}}/>
                </div>
                <div className="col right-section">
                    <h1>{product.name}</h1>
                    <div className="product-meta" style={{display: "flex"}}>
                        <div className="product-brand">
                            <p><a href="#"> Visit the {product.store_id} Store</a></p>
                        </div>
                        <div className="product-brand">
                            <span className="span-rating">{product_ratings.count} Rating(s)</span>
                        </div>
                    </div>
                    <div className="product-meta">
                        <p className="product-price"><span>$</span>{product.price}</p>
                        <div className="product-brand">
                            <p>Sold By : <a href="#">{product.store_id}</a></p>
                            {product_ratings.count !== 0 &&
                            <ReactStars
                                count={5}
                                value={ratingAVG}
                                size={30}
                                isHalf={true}
                                activeColor="#ffd700"
                                edit={false}
                            />}
                        </div>

                        <div className="product-desc">
                            <p>{product.description}</p>
                        </div>
                    </div>
                    <div className="product-meta" style={{display: "flex", padding: "15px"}}>
                        <input type="number" className="form-control-product mr-1 w-25 form-control"
                               defaultValue={1}
                               min={1} w-25/>
                        <button type="submit" className="btn btn-dark btn-product"
                                onClick={() => props.addItem(product)}>Add To Cart
                        </button>
                        <button type="submit" className="btn btn-product" style={{backgroundColor: "#eeee23"}}> Buy
                            Now
                        </button>
                    </div>
                    <div className="">
                        <span><strong>SKU :</strong>SF1133569600-1</span><br/>
                        <span><strong>Category :</strong>{product.category}</span>
                    </div>
                </div>
            </div>

            <div className="">
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="Description" title="Description">
                        <div style={{
                            backgroundColor: "#F1F1F1",
                            width: "1110px",
                            height: "400px",
                            padding: "20px"
                        }}>
                        {product.description}</div>
                    </Tab>
                    <Tab eventKey="Specification" title="Specification">
                        <div style={{
                            backgroundColor: "#F1F1F1",
                            width: "1110px",
                            height: "400px",
                            padding: "20px"
                        }}>
                        <p> belly. XOXO direct trade locavore hammock kogi cronut occupy 3 wolf</p></div>
                    </Tab>
                    <Tab eventKey="Vendor" title="Vendor">
                        <div style={{
                            backgroundColor: "#F1F1F1",
                            width: "1110px",
                            height: "400px",
                            padding: "20px"
                        }}>
                        <p> braid. sssssssssssssXOXO direct trade locavore hammock kogi cronut occupy 3 wolf</p></div>
                    </Tab>
                    <Tab eventKey="Reviews" title={`Review (${product_ratings.count})`}>
                        <p>
                            {product_ratings.count ?
                                <div style={{
                                    backgroundColor: "#F1F1F1",
                                    width: "1110px",
                                    height: "400px",
                                    padding: "20px"
                                }}>
                                    <h1 style={{color: "#669900", justifyItems: "center"}}><span
                                        style={{fontWeight: "bold"}}>{product_ratings.avg.toFixed(1)}</span> out of 5</h1>
                                    <h6>{product_ratings.count} global ratings</h6>

                                    <ReactStars
                                        count={5}
                                        value={ratingAVG}
                                        size={30}
                                        isHalf={true}
                                        activeColor="#ffd700"
                                        edit={false}
                                    />

                                    <div style={{
                                        width: "500px",
                                        height: "200px",}}>
                                        <div>
                                            <Row className="progress-r">
                                                <h6> 5 star </h6>
                                                <Col >
                                                    <ProgressBar variant="warning" className="progress-b"
                                                                 // label={`${(product_ratings.rating_stats[5] / product_ratings.count * 100).toFixed(0)}%`}
                                                                  now={(product_ratings.rating_stats[5] / product_ratings.count * 100).toFixed(0)}/>
                                                </Col>
                                                <h6>{(product_ratings.rating_stats[5] / product_ratings.count * 100).toFixed(0)}%</h6>
                                            </Row >
                                            <Row className="progress-r">
                                                <h6>4 star </h6>
                                                <Col>
                                                    <ProgressBar variant="warning" className="progress-b"
                                                                 //label={`${(product_ratings.rating_stats[4] / product_ratings.count * 100).toFixed(0)}%`}
                                                                 now={(product_ratings.rating_stats[4] / product_ratings.count * 100).toFixed(0)}
                                                    />
                                                </Col>
                                                <h6>{(product_ratings.rating_stats[4] / product_ratings.count * 100).toFixed(0)}%</h6>
                                            </Row>
                                            <Row className="progress-r">
                                                <h6 >3 star </h6>
                                                <Col >
                                                    <ProgressBar variant="warning" className="progress-b"
                                                                // label={`${(product_ratings.rating_stats[3] / product_ratings.count * 100).toFixed(0)}%`}
                                                                 now={(product_ratings.rating_stats[3] / product_ratings.count * 100).toFixed(0)}
                                                    />
                                                </Col>
                                                <h6>{(product_ratings.rating_stats[3] / product_ratings.count * 100).toFixed(0)}%</h6>
                                            </Row>
                                            <Row className="progress-r">
                                                <h6 >2 star </h6>
                                                <Col>
                                                    <ProgressBar variant="warning" className="progress-b"
                                                                // label={`${(product_ratings.rating_stats[2] / product_ratings.count * 100).toFixed(0)}%`}
                                                                 now={(product_ratings.rating_stats[2] / product_ratings.count * 100).toFixed(0)}
                                                    />
                                                </Col>
                                                <h6>{(product_ratings.rating_stats[2] / product_ratings.count * 100).toFixed(0)}%</h6>
                                            </Row>
                                            <Row className="progress-r">
                                                <h6>1 star </h6>
                                                <Col>
                                                    <ProgressBar variant="warning" className="progress-b"
                                                                // label={`${(product_ratings.rating_stats[1] / product_ratings.count * 100).toFixed(0)}%`}
                                                                 now={(product_ratings.rating_stats[1] / product_ratings.count * 100).toFixed(0)}
                                                    />
                                                </Col>
                                                <h6>{(product_ratings.rating_stats[1] / product_ratings.count * 100).toFixed(0)}%</h6>
                                            </Row>
                                        </div>
                                    </div>
                                </div> : "No Review for this product right now "
                            }
                        </p>

                    </Tab>
                    <Tab eventKey="PProducts" title="More Products">
                        <div style={{
                            backgroundColor: "#F1F1F1",
                            width: "1110px",
                            height: "400px",
                            padding: "20px"
                        }}>
                            <p> mpa,dc ezko dokzokdâ</p></div>
                    </Tab>
                </Tabs>
            </div>
        </div>

        : <h4>Loading ...</h4>
}
const mapStatetoProps = createStructuredSelector({
    cartItems: selectCartItems,
});
const mapDispatchtoProps = dispatch => ({
    setLoading: loadingState => dispatch(setLoading(loadingState)),
    addItem: item => dispatch(addItem(item)),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(ProductDetail);

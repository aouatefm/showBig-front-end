import React, {useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
 import './NavOne.css'
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Col from "react-bootstrap/Col";
import {CartIcon, HeartIcon, ProfileIcon, SearchIcon, SignOutIcon} from "../../assets/icons";

import Logo from "../../assets/show-big.png"
import {auth} from "../../firebase/firebase";
import {selectCurrentUser} from "../../redux/user/user-selectors";
import {setLoading} from "../../redux/spinner/spinner-actions";
import {selectCartItems, selectCartItemsCount} from "../../redux/cart/cart-selectors";
import CategoriesService from "../../services/CategoriesService";
import {getTokenId} from "../../firebase/auth";
import {SetVProductsFilters} from "../../redux/filters/filters-actions";
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
const NavOne = ({currentUser, cartLength}) => {
    const categories = useCategories()
    const { history } = useReactRouter();

    const [term, setTerm] = useState('');
    const [cat, setCat] = useState('');

    function search() {
        const urlEncodedTerm = encodeURI(term);
        const urlEncodedCategory = encodeURI(cat);
        history.push(`/product-listing?find_desc=${urlEncodedTerm}&find_cat=${urlEncodedCategory}`);
    }


    return (
        <div className="container-header">
            <Navbar expand="lg" style={{backgroundColor: "black", height: "30px"}}>
                <a href="/admin" style={{color: "#EEEE23", textAlign: "right"}}>Admin Dashboard</a>
            </Navbar>
            <Navbar expand="lg" style={{backgroundColor: "#EEEE23"}}>
                <Col style={{width: "100%", height: "100%", alignContent: "center"}}>
                    <Navbar.Brand href="/">
                        <img src={Logo} className="logo" width="250px" height="85px"/>
                    </Navbar.Brand>
                </Col>
                <Col xs={7}>
                    <Button onClick={() => {
                        console.log(getTokenId())
                    }}>Token</Button>
                    <Button onClick={() => {
                        console.log(currentUser)
                    }}>User</Button>
                    <Form inline>

                            <select onChange={(e) => setCat(e.target.value)}
                                    style={{backgroundColor :"black" ,color :"white" , height :"38px",width :"auto" ,marginRight:'10px'}}>
                                <option key="all" value="">All</option>
                                {

                                    categories &&
                                    <>
                                        {categories.map(category => (
                                            <option key={category.id} >
                                                {category.name}
                                                {/*<Link className="cat-link" to={{ pathname: `/product-listing`, search: `${category.name}`}}>{category.name}</Link>*/}
                                            </option>
                                        ))}
                                    </>
                                }
                            </select>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2 rounded-0"
                                     style={{width: "500px"}}
                                     onChange={(e) => setTerm(e.target.value)}
                        />


                        <Button variant="dark" className="rounded-0" onClick={search} >
                                <SearchIcon width="22"/>
                        </Button>

                    </Form>
                </Col>
                <Col>
                    <span style={{margin: "20px"}}><HeartIcon style={{margin: "20px"}}/></span>
                    <span style={{margin: "20px"}}><Link to='/cart'>
                        <CartIcon/></Link><span style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        position: "absolute",
                        top: "-12px",
                        background: "black",
                        padding: "2px",
                        borderRadius: "50%",
                        color: "#EEEE23"
                    }}>{cartLength}</span></span>
                    {currentUser ? <span style={{margin: "20px"}} onClick={() => auth.signOut()}><SignOutIcon/></span> :
                        <Link to='/register' style={{textDecoration: "none"}}>
                            <ProfileIcon style={{margin: "20px", textDecoration: "none"}}/>
                        </Link>
                    }
                </Col>
            </Navbar>
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    cartItems: selectCartItems,
    cartLength: selectCartItemsCount,
});
const mapDispatchtoProps = (dispatch) => ({
    setLoading: loadingState => dispatch(setLoading(loadingState)),
    SetVProductsFilters: filter => dispatch(SetVProductsFilters(filter)),

});
export default connect(mapStateToProps, mapDispatchtoProps)(NavOne);
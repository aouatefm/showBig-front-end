import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import './NavOne.css'
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {CartIcon, HeartIcon, InvoicesIcon, ProfileIcon, SearchIcon, SignOutIcon} from "../../assets/icons";

import Logo from "../../assets/blck.png"
import {auth} from "../../firebase/firebase";
import {selectCurrentUser} from "../../redux/user/user-selectors";
import {setLoading} from "../../redux/spinner/spinner-actions";
import {selectCartItems, selectCartItemsCount} from "../../redux/cart/cart-selectors";
import CategoriesService from "../../services/CategoriesService";
import {SetVProductsFilters} from "../../redux/filters/filters-actions";
import useReactRouter from 'use-react-router';
import {getTokenId} from "../../firebase/auth";

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
    const {history} = useReactRouter();

    const [term, setTerm] = useState('');
    const [cat, setCat] = useState('');

    function search() {
        const urlEncodedTerm = encodeURI(term);
        const urlEncodedCategory = encodeURI(cat);
        history.push(`/product-listing?find_desc=${urlEncodedTerm}&find_cat=${urlEncodedCategory}`);
    }

    console.log(currentUser)

    return (
        <div className="container-header">
            <Navbar expand="lg" style={{backgroundColor: "black", height: "30px"}}>
                <a href="/admin" style={{color: "#FFFD38", textAlign: "right"}}>Admin Dashboard</a>
            </Navbar>
            <Navbar expand="lg" style={{backgroundColor: "#FFFD38"}}>
                <Col style={{width: "100%", height: "100%", alignContent: "center"}}>
                    <Navbar.Brand href="/">
                        <h1>
                            <img src={Logo} className="logo" width="100px" height="85px"/>
                            <strong>SHO BIG </strong>
                        </h1>
                    </Navbar.Brand>
                </Col>
                <Col xs={7}>
                    {/*<Button onClick={() => {*/}
                    {/*    console.log(getTokenId())*/}
                    {/*}}>Token</Button>*/}
                    {/*<Button onClick={() => {*/}
                    {/*    console.log(currentUser)*/}
                    {/*}}>User</Button>*/}
                    <Form inline>
                        <select onChange={(e) => setCat(e.target.value)}
                                style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    height: "38px",
                                    width: "205px",
                                    marginRight: '10px'
                                }}>
                            <option key="all" value="">All</option>
                            {

                                categories &&
                                <>
                                    {categories.map(category => (
                                        <option key={category.id}>
                                            {category.name}
                                            {/*<Link className="cat-link" to={{ pathname: `/product-listing`, search: `${category.name}`}}>{category.name}</Link>*/}
                                        </option>
                                    ))}
                                </>
                            }
                        </select>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2 rounded-0"
                                     style={{width: "450px"}}
                                     onChange={(e) => setTerm(e.target.value)}
                        />


                        <Button variant="dark" className="rounded-0" onClick={search}>
                            <SearchIcon width="22"/>
                        </Button>

                    </Form>
                </Col>
                <Col>

                    <div className="row">
                        <div className="col">
                            {/*<div><span style={{margin: "20px"}}><HeartIcon style={{margin: "20px"}}/></span></div>*/}
                            <div><span><HeartIcon/></span></div>

                        </div>
                        <div className="col">
                            {/*<div><span style={{margin: "20px"}}><Link to='/cart'>*/}
                            <div><span><Link to='/cart'>
                       <CartIcon width={30}/></Link>
                                <span style={{
                                fontWeight: "bold",
                                textAlign: "center",
                                position: "absolute",
                                top: "-12px",
                                background: "black",
                                padding: "2px",
                                borderRadius: "50%",
                                color: "#EEEE23"
                            }}>{cartLength}</span>
                    </span>
                            </div>
                        </div>
                        <div className="col" style={{marginRight :"66px",height :"50px",width :"50px"}}>
                            {currentUser ?
                                // <span style={{margin: "20px"}} onClick={() => auth.signOut()}>
                                <div className="dropdown">
                                    <span className="btn btn-default dropdown-toggle" type="button" id="menu1"
                                            data-toggle="dropdown">
                                        <img
                                            src="https://www.w3schools.com/w3images/avatar6.png"
                                            alt="Avatar"
                                            style={{
                                                verticalAlign: "middle",
                                                width: "50px",
                                                height: "50px",
                                                borderRadius: "50%"
                                            }}
                                        />
                                    </span>
                                    <ul className="dropdown-menu" role="menu" aria-labelledby="menu1" style={{right: "0", left: "auto", padding :"13px"}}>
                                        <img
                                            src="https://www.w3schools.com/w3images/avatar6.png"
                                            alt="Avatar"
                                            style={{
                                                verticalAlign: "middle",
                                                width: "30px",
                                                height: "30px",
                                                borderRadius: "50%",
                                                margin : "8px",
                                                display :" inline-block"
                                            }}
                                        />
                                        <p style={{ display :" inline-block"}}>{currentUser.displayName}</p>
                                        <li role="presentation"><span role="menuitem" tabIndex="-1" href="#">{currentUser.email}</span></li>
                                        <div className="dropdown-divider lis"/>
                                        <li role="presentation" className="li_pointer"><span role="menuitem" tabIndex="-1"><ProfileIcon width="15"/>  Profile page</span></li>
                                        <li role="presentation" className="li_pointer"><span role="menuitem" tabIndex="-1"><InvoicesIcon width="15" />  Order invoices</span></li>
                                        <li role="presentation" className="li_pointer "><a role="menuitem" tabIndex="-1" onClick={() => auth.signOut()} style={{}}><SignOutIcon width="15"/>  Sign out</a></li>
                                    </ul>
                                </div>
                                : <Link to='/register' style={{textDecoration: "none"}}>
                                <ProfileIcon style={{margin: "20px", textDecoration: "none"}} width={30}/>
                                </Link>
                            }
                        </div>
                        {/*<div className="btn-group dropleft">*/}
                        {/*    <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown"*/}
                        {/*            aria-haspopup="true" aria-expanded="false">*/}
                        {/*        Dropleft*/}
                        {/*    </button>*/}
                        {/*    <div className="dropdown-menu">*/}
                        {/*        <a className="dropdown-item" href="#">Action</a>*/}
                        {/*        <a className="dropdown-item" href="#">Another action</a>*/}
                        {/*        <a className="dropdown-item" href="#">Something else here</a>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                    </div>












                {/*    <div><span style={{margin: "20px"}}><HeartIcon style={{margin: "20px"}}/></span></div>*/}
                {/*    <div><span style={{margin: "20px"}}><Link to='/cart'>*/}
                {/*       <CartIcon/></Link><span style={{*/}
                {/*        fontWeight: "bold",*/}
                {/*        textAlign: "center",*/}
                {/*        position: "absolute",*/}
                {/*        top: "-12px",*/}
                {/*        background: "black",*/}
                {/*        padding: "2px",*/}
                {/*        borderRadius: "50%",*/}
                {/*        color: "#EEEE23"*/}
                {/*    }}>{cartLength}</span>*/}
                {/*    </span></div>*/}
                {/*    <div>*/}
                {/*    {currentUser ?*/}
                {/*        // <span style={{margin: "20px"}} onClick={() => auth.signOut()}>*/}
                {/*        <div className="dropdown">*/}
                {/*            <button className="btn btn-default dropdown-toggle" type="button" id="menu1"*/}
                {/*                    data-toggle="dropdown">*/}
                {/*                <img*/}
                {/*                    src="https://www.w3schools.com/w3images/avatar6.png"*/}
                {/*                    alt="Avatar"*/}
                {/*                    style={{*/}
                {/*                        verticalAlign: "middle",*/}
                {/*                        width: "50px",*/}
                {/*                        height: "50px",*/}
                {/*                        borderRadius: "50%"*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*            </button>*/}
                {/*            <ul className="dropdown-menu" role="menu" aria-labelledby="menu1">*/}
                {/*                <img*/}
                {/*                    src="https://www.w3schools.com/w3images/avatar6.png"*/}
                {/*                    alt="Avatar"*/}
                {/*                    style={{*/}
                {/*                        verticalAlign: "middle",*/}
                {/*                        width: "30px",*/}
                {/*                        height: "30px",*/}
                {/*                        borderRadius: "50%",*/}
                {/*                        marginLeft : "5px"*/}
                {/*                    }}*/}
                {/*                />*/}
                {/*                <h2>{currentUser.fullName}</h2>*/}
                {/*                <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">{currentUser.email}</a></li>*/}
                {/*                <div className="dropdown-divider"/>*/}
                {/*                <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Profile page</a></li>*/}
                {/*                <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Order invoices</a></li>*/}
                {/*                <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">Sign out</a></li>*/}
                {/*            </ul>*/}
                {/*        </div>*/}
                {/*        : <SignOutIcon/>}*/}
                {/*    </div>*/}
                {/*    /!*<Link to='/register' style={{textDecoration: "none"}}>*!/*/}
                {/*    /!*<ProfileIcon style={{margin: "20px", textDecoration: "none"}}/>*!/*/}
                {/*    /!*</Link>*!/*/}

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
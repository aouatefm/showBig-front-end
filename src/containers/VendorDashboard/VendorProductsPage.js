import React, { useEffect, useState} from 'react';
import VendorProducts from "../../components/VendorDashboard/VendorProducts";
import SearchFormProducts from "../../components/VendorDashboard/SearchFormProducts";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user-selectors";
import {connect} from "react-redux";
import UserService from "../../services/UserService";
import ProductService from "../../services/ProductService";
import NavThree from "../../components/NavBar/NavThree";
import SpinnerPage from "../Spinner/SpinnerPage";

const VendorProductsPage = ({currentUser}) => {
    const [store, setStore] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a first request
                //const userProfile = await UserService.getUser("Skj2uyB9sMMz0V3nHrN6rkZc5XB3")
                const userProfile = await UserService.getUser(currentUser.uid)
                setStore(userProfile.store_id);
                // Use resutlt in the second request
                const newProducts = await ProductService.getProductsByStore(store)
                setProducts(newProducts);
            } catch (e) {
                console.log(e)
            }
        };
        fetchData();
    }, [store, currentUser]);

    return (
        <>
        {
            currentUser ?
        <>
                        <div>
                            <div className="row">
                                <div className="col col-lg-2">
                                    <NavThree/>
                                </div>
                                <div className="col" >
                                    <SearchFormProducts prods={products} store={store}/>
                                    <VendorProducts prods={products} store={store}/>
                                </div>
                            </div>
                        </div>
        </>

            :
                <div className="row">
                    <div className="col col-lg-2">
                        <NavThree/>
                    </div>
                    <div className="col" >
                        <SpinnerPage/>
                    </div>
                </div>}

        </>
    );
}


const mapStateToProps = createStructuredSelector(
{currentUser: selectCurrentUser,}
)
export default connect(mapStateToProps)(VendorProductsPage);

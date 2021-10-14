import React, {useEffect, useState} from 'react';
import NavThree from "../NavBar/NavThree";
import VendorService from "../../services/VendorService";
import UserService from "../../services/UserService";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user-selectors";
import {connect} from "react-redux";
import VendorCustomersContainer from "./VendorCustomersContainer";


const VendorCustomers = ({currentUser}) => {
    const [store_id, setStore] = useState(null);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfile = await UserService.getUser(currentUser.uid)
                setStore(userProfile.store_id);
                if (store_id)
                {const NewCustomers = await VendorService.getStoreCustomers(store_id)
                setCustomers(NewCustomers);}
            } catch (e) {
                console.log(e)
            }
        };
        fetchData();
    }, [store_id, currentUser]);

   return (
        <>
            {
                store_id ?
                    <>
                        <div>
                            <div className="row">
                                <div className="col col-lg-2">
                                    <NavThree/>
                                </div>
                                <div className="col" >
                                    <VendorCustomersContainer customers={customers} store={store_id}/>
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
                            <h1>Loading ...</h1>
                        </div>
                    </div>}

        </>

    );
}

const mapStateToProps = createStructuredSelector(
    {currentUser: selectCurrentUser,}
);
export default connect(mapStateToProps)(VendorCustomers);
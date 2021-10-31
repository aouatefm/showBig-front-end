import React, {useEffect, useMemo, useRef, useState} from 'react';
import NavThree from "../NavBar/NavThree";

import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user-selectors";
import {connect} from "react-redux";
import UserService from "../../services/UserService";
import StoreSettingsPresentation from "./StoreSettingsPresentation";

const StoreSettings = ({currentUser}) => {


    const [store, setStore] = useState(false)

    useEffect(async () => {
            try {
                const userStore = await UserService.getUserStoreById(currentUser.uid)
                    setStore(userStore)
            } catch (e) {
                console.log(e)
            }
    }, [currentUser]);




    return (
        <div className="row">
            <div className="col col-lg-2">
                <NavThree/>
            </div>

            <div className="col">
                <div className="container">
                    <h1>Store Settings</h1>
                    {currentUser  ?
                        <StoreSettingsPresentation store={store}/> : <h6>Loading ...</h6>}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector(
    {
        currentUser: selectCurrentUser,
    }
);
export default connect(mapStateToProps)(StoreSettings);
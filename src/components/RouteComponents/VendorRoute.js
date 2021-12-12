import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {useSession} from "../../firebase/UserProvider";
import {createStructuredSelector} from "reselect";
import {selectRole} from "../../redux/user/user-selectors";
import {connect} from "react-redux";

const VendorRoute = ({ component: Component,role, ...rest }) => {
    const { user } = useSession()
    return (
        <Route
            {...rest}
            render={(props) =>
                user && role==='user' ? (
                       <Component {...props} />
                    ) :
                    user && role==='vendor'?  (
                            <Redirect
                                to={{
                                    pathname: `/dashboard`,
                                    state: { from: props.location },
                                }}
                            />
                        ) :
                        user && role ==='admin'?  (
                                <Redirect
                                    to={{
                                        pathname: `/admin`,
                                        state: { from: props.location },
                                    }}
                                />
                            ) :

                        <Redirect
                            to={{
                                pathname: `/register`,
                                state: { from: props.location },
                            }}
                        />

            }
        />
    );
};

const mapStateToProps = createStructuredSelector({
    role: selectRole,
});
export default connect(mapStateToProps)(VendorRoute);
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {useSession} from "../../firebase/UserProvider";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useSession()
    return (
        <Route
            {...rest}
            render={(props) =>
                 user ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: `/register`,
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default ProtectedRoute;
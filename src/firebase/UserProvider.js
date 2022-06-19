import React, {useEffect, useState, useContext} from 'react';
import {auth} from "./firebase";


export const UserContext = React.createContext();
 export const UserProvider = (props) => {
    const [session, setSession] = useState({loading: true, user: null, role: null});
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async userAuth => {
            await setSession({loading: false, user: userAuth})

        })
        return () => unsubscribe();
    }, []);
    return (
        <UserContext.Provider value={session}>
            {!session.loading && props.children}
        </UserContext.Provider>
    )
}
export const useSession = () => {
    const session = useContext(UserContext);
    return session;
}



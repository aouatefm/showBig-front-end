import firebase from 'firebase/app';
//import 'firebase/auth';
import {auth} from "./firebase";
export const logout = () => {
    return firebase.auth().signOut();
};
export const login = async (email, password) => {
    const resp = await auth.signInWithEmailAndPassword(email, password);
    return resp.user;
};

export const getTokenId =  async () => {
    const token = await auth.currentUser.getIdToken();
    return  token
};


import { UserActionTypes } from './user-types';

const INITIAL_STATE = {
    currentUser: null,
    role:null,
    profile :null
}
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            }
        case UserActionTypes.SET_ROLE:
            return {
                ...state,
                role: action.payload,
            }
        case UserActionTypes.SET_USER_PROFILE:
            return {
                ...state,
                profile: action.payload,
            }
               default:
            return state;
    }
}

export default userReducer;
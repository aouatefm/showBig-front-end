import { SpinnerActionTypes } from './spinner-types';

const INITIAL_STATE = {
    isLoading: false,
}

const spinnerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SpinnerActionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            }
        default:
            return state;
    }
}

export default spinnerReducer;
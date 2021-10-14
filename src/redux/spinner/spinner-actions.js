import { SpinnerActionTypes } from './spinner-types';

export const setLoading = (loadingState) => ({
    type: SpinnerActionTypes.SET_LOADING,
    payload: loadingState,
});
import { UserActionTypes } from './user-types';

export const setCurrentUser = (user) => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user,
});
export const setRole= (role) => ({
    type: UserActionTypes.SET_ROLE,
    payload: role,
});
export const setUserProfile= (profile) => ({
    type: UserActionTypes.SET_USER_PROFILE,
    payload: profile,
});

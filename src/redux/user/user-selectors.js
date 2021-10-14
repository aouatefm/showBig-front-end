import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
    [selectUser],
    user => user.currentUser
);
export const selectRole = createSelector(
    [selectUser],
    user => user.role
);
export const selectUserProfile = createSelector(
    [selectUser],
    user => user.profile
);

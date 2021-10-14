import { createSelector } from 'reselect';

const selectSpinner = (state) => state.spinner;

export const selectLoading = createSelector(
    [selectSpinner],
    (spinner) => spinner.isLoading,
);
import { createSelector } from 'reselect';

const selectFilters = (state) => state.filters

export const selectSideBar = createSelector(
    [selectFilters],
    (filters) => filters.sidebar
);

export const select_v_products_filters = createSelector(
    [selectFilters],
    (filters) => filters.v_products_search
);
export const select_vendors_filters = createSelector(
    [selectFilters],
    (filters) => filters.vendor_search
);
export const select_order_filters = createSelector(
    [selectFilters],
    (filters) => filters.order_filters
);

export const selectSearchBar = createSelector(
    [selectFilters],
    (filters) => filters.searchbar
);

export const selectSortBar = createSelector(
    [selectFilters],
    (filters) => filters.sortbar
);

export const selectViewBar = createSelector(
    [selectFilters],
    (filters) => filters.viewbar
);

export const selectSideBarFilters = createSelector(
    [selectSideBar],
    (sidebar) => sidebar.filters
);

export const selectSideBarDropped = createSelector(
    [selectSideBar],
    (sidebar) => sidebar.dropped
);



export const selectViewBarGridList = createSelector(
    [selectFilters],
    (filters) => filters.viewbargrid
);
export const selectSearchBarKeywords = createSelector(
    [selectSearchBar],
    (searchbar) => searchbar.keywords
);
export const selectStatus = createSelector(
    [selectFilters],
    (filters) => filters.order_status
);
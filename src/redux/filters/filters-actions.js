import { FiltersActionTypes } from './filters-types';

export const setSideBarFilters = (newFilters) => ({
    type: FiltersActionTypes.SET_SIDEBAR_FILTERS,
    payload: newFilters,
});
export const SetVProductsFilters = (filters) => ({
    type: FiltersActionTypes.SET_V_PRODUCTS_FILTERS,
    payload: filters,
});

export const SetOrderFilters = (filters) => ({
    type: FiltersActionTypes.SET_ORDER_FILTERS,
    payload: filters,
});

export const toggleSideBarDropped = () => ({
    type: FiltersActionTypes.TOGGLE_SIDEBAR_DROPPED,
});

export const setSearchBarFilters = (keywords) => ({
    type: FiltersActionTypes.SET_SEARCHBAR_FILTERS,
    payload: keywords,
});

export const setSortBarValue = (value) => ({
    type: FiltersActionTypes.SET_SORTBAR_VALUE,
    payload: value,
});

export const setViewBarValue = (value) => ({
    type: FiltersActionTypes.SET_VIEWBAR_VALUE,
    payload: value,
});
export const toggleViewBarGridList = () => ({
    type: FiltersActionTypes.TOGGLE_VIEWBAR_GRID_LIST,
});
// export const setDisplayStatus = (value) => ({
//     type: FiltersActionTypes.SET_DISPLAY_STATUS,
//     payload: value,
// });



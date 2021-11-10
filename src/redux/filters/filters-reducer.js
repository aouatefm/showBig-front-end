import { FiltersActionTypes } from './filters-types';
const INITIAL_STATE = {
    searchbar: {keywords: '',},
    sidebar: {filters: {brands: [], staticBrands: [], minPrice: 0, maxPrice: 1000, minRate: 0, maxRate: 5, conditions: [],}, dropped: false,},
    sortbar: 'none',
    viewbar: 5,
    viewbargrid : true,
    v_products_search : {date : "", category :"", status :""},
    vendor_search : {name : "", address :""},
    order_status : 'all',
    order_filters :{date : "", customer :"", orderId:"", status:'all'},
}
const filtersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FiltersActionTypes.SET_SIDEBAR_FILTERS:
            return {
                ...state,
                sidebar: {
                    ...state.sidebar,
                    filters: {
                        ...state.sidebar.filters,
                        ...action.payload,
                    }
                },
            }
            case FiltersActionTypes.SET_V_PRODUCTS_FILTERS:
            return {
                ...state,
                    v_products_search: {
                        ...state.v_products_search,
                        ...action.payload,

                    }
            }
        case FiltersActionTypes.SET_VENDOR_FILTERS:
            return {
                ...state,
                vendor_search: {
                    ...state.vendor_search,
                    ...action.payload,

                }
            }
        case FiltersActionTypes.SET_ORDER_FILTERS:
            return {
                ...state,
                order_filters: {
                    ...state.order_filters,
                    ...action.payload,
                }
            }
        case FiltersActionTypes.TOGGLE_SIDEBAR_DROPPED:
            return {
                ...state,
                sidebar: {
                    ...state.sidebar,
                    dropped: !state.sidebar.dropped,
                },
            }
        case FiltersActionTypes.SET_SEARCHBAR_FILTERS:
            return {
                ...state,
                searchbar: {
                    ...state.searchbar,
                    keywords: action.payload
                }
            }
        case FiltersActionTypes.SET_SORTBAR_VALUE:
            return {
                ...state,
                sortbar: action.payload
            }

        case FiltersActionTypes.SET_VIEWBAR_VALUE:
            return {
                ...state,
                viewbar: action.payload
            }
        case FiltersActionTypes.TOGGLE_VIEWBAR_GRID_LIST:
            return {
                ...state,
                viewbargrid: !state.viewbargrid,
            }
        // case FiltersActionTypes.SET_DISPLAY_STATUS:
        //     return {
        //         ...state,
        //         order_status: action.payload,
        //     }
        default:
            return state;
    }
};

export default filtersReducer;
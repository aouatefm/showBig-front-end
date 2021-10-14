import {createSelector} from "reselect";

// const selectProducts = state =>state.products;
const selectShop = (state) => state.products;

// export const selectProductsItems = createSelector(
//     [selectProducts], products =>products.products
// )

export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.products,
);



export const selectCollection = createSelector(
    [selectShop],
    collections => collections ? collections : [],
);

export const selectItems  = params => createSelector(
    [selectCollection],
    shoesCollection => shoesCollection.find(
        item => item.id === params
    ),
);
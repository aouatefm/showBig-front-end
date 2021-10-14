import { createStore, applyMiddleware} from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk'
import rootReducer from './root-reducer';


const middleWares = [];

//export const store = createStore(rootReducer, applyMiddleware(...middleWares));
export const store = createStore(
    rootReducer, /* preloadedState, */
    //applyMiddleware(...middleWares)
    applyMiddleware(thunk)
    +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);
export default { store, persistStore };
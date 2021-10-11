import { combineReducers,applyMiddleware,createStore } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import loadingReducer from '../reducers/loadingReducer'
import messageReducer from '../reducers/messageReducer'
import categoryReducer from '../reducers/categoryReducer'
import productReducer from '../reducers/productReducer'
import filterReducer from '../reducers/filterReducer'
import cartReducer from '../reducers/cartReducer'
import userReducer from '../reducers/userReducer'
const reducer = combineReducers({
    loading:loadingReducer,
    messages:messageReducer,
    categories : categoryReducer,
    products: productReducer,
    filters:filterReducer,
    cart: cartReducer,
    users:userReducer,
})

const initialState = {}
const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store
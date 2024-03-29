import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
    productListReducer,
    productDetailReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productCreateReviewRdeucer,
    prodcutTopReducer
} from './reducers/productReducers';
import {
    userLoginReducer,
    userDetailReducer,
    userRegisterReducer,
    userUpdateDetailReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer
} from './reducers/userReducers';
import {
    orderCreateReducer,
    orderDetailReducer,
    orderPayReducer,
    orderMyListReducer,
    orderListReducer,
    orderDeliverReducer
} from './reducers/orderReducers';
import {
    cartReducer
} from './reducers/cartReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    userUpdateDetail: userUpdateDetailReducer,
    orderCreate: orderCreateReducer,
    orderDetail: orderDetailReducer,
    orderPay: orderPayReducer,
    orderMyList: orderMyListReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    productCreateReview: productCreateReviewRdeucer,
    prodcutTop: prodcutTopReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ?
    JSON.parse(localStorage.getItem('paymentMethod')) : null;

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
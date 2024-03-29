import axios from 'axios';

import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_SUCCESS,
    ORDER_MY_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL
} from '../constants/orderConstants';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';
import { logoutUser } from './userActions';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post('/api/orders', order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        });

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data
        });
        localStorage.removeItem('cartItems');
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logoutUser());
        }
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: message,
        });
    }
}

export const detailOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAIL_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/${id}`, config);

        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data
        });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logoutUser());
        }
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: message,
        });
    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logoutUser());
        }
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: message,
        });
    }
}

export const listMyOrder = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_MY_LIST_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/api/orders/myorders', config);

        dispatch({
            type: ORDER_MY_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logoutUser());
        }
        dispatch({
            type: ORDER_MY_LIST_FAIL,
            payload: message,
        });
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('/api/orders', config);

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logoutUser());
        }
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: message,
        });
    }
}

export const deliverOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELIVER_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, config);

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        });
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logoutUser());
        }
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: message,
        });
    }
}

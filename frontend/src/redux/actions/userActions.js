import axios from 'axios';

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    USER_DETAIL_FAIL,
    USER_DETAIL_RESET,
    USER_UPDATE_DETAIL_REQUEST,
    USER_UPDATE_DETAIL_SUCCESS,
    USER_UPDATE_DETAIL_FAIL
} from '../constants/userConstants';
import { ORDER_MY_LIST_RESET } from '../constants/orderConstants';

export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login', { email, password }, config);

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}

export const logoutUser = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAIL_RESET });
    dispatch({ type: ORDER_MY_LIST_RESET });

    localStorage.removeItem('userInfo');
}

export const registerUser = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users', { name, email, password }, config);

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

export const getDetailUser = (profile) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAIL_REQUEST });
        
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users/${profile}`, config);

        dispatch({
            type: USER_DETAIL_SUCCESS,
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
            type: USER_DETAIL_FAIL,
            payload: message
        });
    }
}

export const updateDetailUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_DETAIL_REQUEST });
        
        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put('/api/users/profile', user, config);

        dispatch({
            type: USER_UPDATE_DETAIL_SUCCESS,
            payload: data
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
            
        if (message === 'Not authorized, token failed') {
            dispatch(logoutUser());
        }

        dispatch({
            type: USER_UPDATE_DETAIL_FAIL,
            payload: message
        });
    }
}
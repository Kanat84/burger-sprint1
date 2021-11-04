import { Dispatch } from "react";
import { History, Location } from 'history';
import { checkResponse, getUser, patchUser, sendData } from "../../utils/funcs";
import { apiURL } from "../../utils/consts";

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_INFO = 'GET_USER_INFO';
export const SET_IS_AUTH = 'SET_IS_AUTH';
export const DELETE_IS_AUTH = 'DELETE_IS_AUTH';
export const CHANGE_USER_INFO = 'CHANGE_USER_INFO';
export const SET_WAS_ON_FORGOT_PAGE = 'SET_WAS_ON_FORGOT_PAGE';
export const DELETE_WAS_ON_FORGOT_PAGE = 'DELETE_WAS_ON_FORGOT_PAGE';

export function postForgotPassword(emailValue: string, history: History) {
    return function (dispatch: Dispatch<any>) {
        dispatch({ type: GET_USER_REQUEST })
        sendData({
            url: `${apiURL}/password-reset`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {email: emailValue}
        })
            .then(res => checkResponse(res))
            .then(res => {
                    if (res && res.success) {
                  //      console.log(res);
                        history.push('/reset-password');
                    } else {
                        dispatch({ type: GET_USER_FAILED })
                    }
                }
            )
            .catch(err => {
                console.log(err)
                dispatch({ type: GET_USER_FAILED })
            })
    }
}

export function postResetPassword(form: { password: string; token: string }, history: History) {
    return function (dispatch: Dispatch<any>) {
        dispatch({ type: GET_USER_REQUEST })
        sendData({
            url: `${apiURL}/password-reset/reset`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                password: form.password,
                token: form.token
            }
        })
            .then(res => checkResponse(res))
            .then(res => {
                    if (res && res.success) {
                        history.push('/login');
                    } else {
                        dispatch({ type: GET_USER_FAILED })
                    }
                }
            )
            .catch(err => {
                console.log(err)
                dispatch({ type: GET_USER_FAILED })
            })
    }
}

export function postRegister (form: { email: string; password: string; name: string;}, history: History) {
    return function (dispatch: Dispatch<any>) {
        dispatch({
            type: GET_USER_REQUEST
        })
        sendData({
            url: `${apiURL}/auth/register`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                email: form.email,
                password: form.password,
                name: form.name
            }
        })
            .then(res => checkResponse(res))
            .then(res => {
                    if (res && res.success) {
                        dispatch({
                            type: GET_USER_SUCCESS,
                            payload: { user: res.user }
                        });
                        dispatch({
                            type: SET_IS_AUTH,
                            payload: {
                                accessToken: res.accessToken,
                                refreshToken: res.refreshToken
                            }
                        })
                        history.push({pathname: "/"});
                    } else {
                        dispatch({ type: GET_USER_FAILED })
                    }
                }
            )
            .catch(err => {
                console.log(err)
                dispatch({ type: GET_USER_FAILED })
            })
    }
}

export function postLogin(form: Omit<{ email: string; password: string; name: string }, 'name'>, history: History, from: { pathname: string }) {
    return function (dispatch: Dispatch<any>) {
        dispatch({
            type: GET_USER_REQUEST
        })
        sendData({
            url: `${apiURL}/auth/login`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                email: form.email,
                password: form.password,
            }
        })
            .then(res => checkResponse(res))
            .then(res => {
                    if (res && res.success) {
                        dispatch({
                            type: GET_USER_SUCCESS,
                            payload: { user: res.user }
                        });
                        dispatch({
                            type: SET_IS_AUTH,
                            payload: { accessToken: res.accessToken, refreshToken: res.refreshToken }
                        })
                        history.replace(from)
                    } else {
                        dispatch({ type: GET_USER_FAILED })
                    }
                }
            )
            .catch(err => {
                console.log(err)
                alert(err.message)
                dispatch({ type: GET_USER_FAILED })
            })
    }
}

export function postLogout(history: History) {
    return function (dispatch: Dispatch<any>) {
        dispatch({
            type: GET_USER_REQUEST
        })
        sendData({
            url: `${apiURL}/auth/logout`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { token: localStorage.getItem('refreshToken') }
        })
            .then(res => checkResponse(res))
            .then(res => {
                    if (res && res.success) {
                        dispatch({ type: DELETE_IS_AUTH })
                        history.replace({pathname: '/login'})
                    } else {
                        dispatch({ type: GET_USER_FAILED })
                    }
                }
            )
            .catch(err => {
                console.log(err)
                alert(err.message)
                dispatch({ type: GET_USER_FAILED })
            })
    }
}

export function getUserInfo() {
    return async function (dispatch: Dispatch<any>) {
        dispatch({ type: GET_USER_REQUEST })
        await getUser()
            .then(res => {
                    if (res && res.success) {
                        dispatch({ type: GET_USER_INFO, payload: { user: res.user }})
                    } else {
                        dispatch({ type: GET_USER_FAILED })
                    }
                }
            )
            .catch(err => {
                console.log(err)
                dispatch({ type: GET_USER_FAILED })
            })
    }
}

export function postChangeUserInfo(form: { email: string; password: string; name: string }) {
    return async function (dispatch: Dispatch<any>) {
        dispatch({ type: GET_USER_REQUEST })
        await patchUser(form)
        .then(res => {
            if (res && res.success) {
                dispatch({ type: CHANGE_USER_INFO, payload: { user: res.user }})
            } else {
                dispatch({ type: GET_USER_FAILED })
            }
        })
        .catch(err => {
            console.log(err)
            dispatch({ type: GET_USER_FAILED })
        })
    }
}
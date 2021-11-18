import { History } from 'history';
import { checkResponse, getUser, patchUser, sendData } from "../../utils/funcs";
import { apiURL } from "../../utils/consts";
import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    GET_USER_INFO,
    CHANGE_USER_INFO,
    SET_IS_AUTH,
    DELETE_IS_AUTH,
    SET_WAS_ON_FORGOT_PAGE,
    DELETE_WAS_ON_FORGOT_PAGE
  } from '../constants';
import { TUser, TUserData, TPasswordData, AppDispatch } from "../types";

export interface IGetUserRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    readonly user: TUser;
}
export interface IGetUserFailedAction {
    readonly type: typeof GET_USER_FAILED;
}
export interface IGetUserInfoAction {
    readonly type: typeof GET_USER_INFO;
    readonly user: TUser;
}
export interface IChangeUserInfoAction {
    readonly type: typeof CHANGE_USER_INFO;
    readonly payload: {
        user: TUser
    }    
}
export interface ISetIsAuthAction {
    readonly type: typeof SET_IS_AUTH;
    readonly payload: {
        accessToken: string,
        refreshToken: string
    }    
}
export interface IDeleteIsAuthAction {
    readonly type: typeof DELETE_IS_AUTH;
}
export interface ISetWasOnForgotPageAction {
    readonly type: typeof SET_WAS_ON_FORGOT_PAGE;
}export interface IDeleteWasOnForgotPageAction {
    readonly type: typeof DELETE_WAS_ON_FORGOT_PAGE;
}
export type TUsersActions =
  IGetUserRequestAction |
  IGetUserSuccessAction |
  IGetUserFailedAction |
  IGetUserInfoAction |
  IChangeUserInfoAction |  
  ISetIsAuthAction |
  IDeleteIsAuthAction |
  ISetWasOnForgotPageAction |
  IDeleteWasOnForgotPageAction;

export function GetUserRequestAction(): IGetUserRequestAction {
    return ({
        type: GET_USER_REQUEST
    });
}
export function GetUserSuccessAction(user: TUser): IGetUserSuccessAction {
    return ({
        type: GET_USER_SUCCESS,
        user
    });
}
export function GetUserFailedAction(): IGetUserFailedAction {
    return ({
        type: GET_USER_FAILED
    });
}
export function SetIsAuthAction(accessToken: string, refreshToken: string): ISetIsAuthAction {
    return ({
        type: SET_IS_AUTH,
        payload: { accessToken, refreshToken }
    });
}
export function DeleteIsAuthAction(): IDeleteIsAuthAction {
    return ({
        type: DELETE_IS_AUTH
    });
}
export function GetUserInfoAction(user: TUser): IGetUserInfoAction {
    return ({
        type: GET_USER_INFO,
        user        
    });
}
export function ChangeUserInfoAction(user: TUser): IChangeUserInfoAction {
    return ({       
        type: CHANGE_USER_INFO,
        payload: { user }         
    });
}
export function SetWasOnForgotPageAction(): ISetWasOnForgotPageAction {
    return ({
        type: SET_WAS_ON_FORGOT_PAGE
    });
}
export function DeleteWasOnForgotPageAction(): IDeleteWasOnForgotPageAction {
    return ({
        type: DELETE_WAS_ON_FORGOT_PAGE
    });
}

export function postForgotPassword(emailValue: string, history: History) {
    return function (dispatch: AppDispatch) {
        dispatch(GetUserRequestAction())
        sendData({
            url: `${apiURL}/password-reset`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {email: emailValue}
        })
            .then(res => checkResponse(res))
            .then(res => {
                    if (res && res.success) {
                        history.push('/reset-password');
                    } else {
                        dispatch(GetUserFailedAction())
                    }
                }
            )
            .catch(err => {
                console.log(err)
                dispatch(GetUserFailedAction())
            })
    }
}

export function postResetPassword(form: TPasswordData, history: History) {
    return function (dispatch: AppDispatch) {
        dispatch(GetUserRequestAction())
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
                        dispatch(GetUserFailedAction())
                    }
                }
            )
            .catch(err => {
                console.log(err)
                dispatch(GetUserFailedAction())
            })
    }
}

export function postRegister (form: TUserData, history: History) {
    return function (dispatch: AppDispatch) {
        dispatch(GetUserRequestAction())
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
                        dispatch(GetUserSuccessAction(res.user));
                        dispatch(SetIsAuthAction(res.accessToken, res.refreshToken))
                        history.push({pathname: "/"});
                    } else {
                        dispatch(GetUserFailedAction())
                    }
                }
            )
            .catch(err => {
                console.log(err)
                dispatch(GetUserFailedAction())
            })
    }
}

export function postLogin(form: Omit<TUserData, 'name'>, history: History, from: { pathname: string }) {
    return function (dispatch: AppDispatch) {
        dispatch(GetUserRequestAction());
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
                        dispatch(GetUserSuccessAction(res.user));
                        dispatch(SetIsAuthAction(res.accessToken, res.refreshToken))
                        history.replace(from)
                    } else {
                        dispatch(GetUserFailedAction())
                    }
                }
            )
            .catch(err => {
                console.log(err)
                alert(err.message)
                dispatch(GetUserFailedAction())
            })
    }
}

export function postLogout(history: History) {
    return function (dispatch: AppDispatch) {
        dispatch(GetUserRequestAction())
        sendData({
            url: `${apiURL}/auth/logout`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { token: localStorage.getItem('refreshToken') }
        })
            .then(res => checkResponse(res))
            .then(res => {
                    if (res && res.success) {
                        dispatch(DeleteIsAuthAction())
                        history.replace({pathname: '/login'})
                    } else {
                        dispatch(GetUserFailedAction())
                    }
                }
            )
            .catch(err => {
                console.log(err)
                alert(err.message)
                dispatch(GetUserFailedAction())
            })
    }
}

export function getUserInfo() {
    return async function (dispatch: AppDispatch) {
        dispatch(GetUserRequestAction())
        await getUser()
            .then(res => {
                    if (res && res.success) {
                        dispatch(GetUserInfoAction(res.user))
                    } else {
                        dispatch(GetUserFailedAction())
                    }
                }
            )
            .catch(err => {
                console.log(err)
                dispatch(GetUserFailedAction())
            })
    }
}

export function postChangeUserInfo(form: TUserData) {
    return async function (dispatch: AppDispatch) {
        dispatch(GetUserRequestAction())
        await patchUser(form)
        .then(res => {
            if (res && res.success) {
                dispatch(ChangeUserInfoAction(res.user))
            } else {
                dispatch(GetUserFailedAction())
            }
        })
        .catch(err => {
            console.log(err)
            dispatch(GetUserFailedAction())
        })
    }
}
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
import { TUser } from "../types";

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
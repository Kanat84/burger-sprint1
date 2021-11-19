import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    CLEAR_ORDER,    
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED,
    CLEAR_ORDER_NUMBER
  } from '../constants';

export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly payload: string; 
}
export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}
export interface IClearOrderAction {
    readonly type: typeof CLEAR_ORDER;
}  
export interface IGetOrderNumberRequestsAction {
    readonly type: typeof GET_ORDER_NUMBER_REQUEST;
}
export interface IGetOrderNumberSuccessAction {
    readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
    readonly payload: string;
}
export interface IGetOrderNumberFailedAction {
    readonly type: typeof GET_ORDER_NUMBER_FAILED;
}
export interface IClearOrderNumberAction {
    readonly type: typeof CLEAR_ORDER_NUMBER;
}

export type TOrdersActions =
    IGetOrderRequestAction |
    IGetOrderSuccessAction |
    IGetOrderFailedAction |
    IClearOrderAction |
    IGetOrderNumberRequestsAction |
    IGetOrderNumberSuccessAction |
    IGetOrderNumberFailedAction |
    IClearOrderNumberAction;

export function GetOrderRequestAction(): IGetOrderRequestAction {
    return ({
        type: GET_ORDER_REQUEST
    });
}
export function GetOrderSuccessAction(payload: string): IGetOrderSuccessAction {
    return ({
        type: GET_ORDER_SUCCESS,
        payload
    });
}
export function GetOrderFailedAction(): IGetOrderFailedAction {
    return ({
        type: GET_ORDER_FAILED
    });
}
export function ClearOrderAction(): IClearOrderAction {
    return ({
        type: CLEAR_ORDER
    });
}    
export function GetOrderNumberRequestsAction(): IGetOrderNumberRequestsAction {
    return ({
        type: GET_ORDER_NUMBER_REQUEST
    });
}
export function GetOrderNumberSuccessAction(payload: string): IGetOrderNumberSuccessAction {
    return ({
        type: GET_ORDER_NUMBER_SUCCESS,
        payload
    });
} 
export function GetOrderNumberFailedAction(): IGetOrderNumberFailedAction {
    return ({
        type: GET_ORDER_NUMBER_FAILED
    });
}      
export function ClearOrderNumberAction(): IClearOrderNumberAction {
    return ({
        type: CLEAR_ORDER_NUMBER
    });
}   
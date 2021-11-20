import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
  } from '../constants';
import { TFeedItem } from "../../services/types";

export interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string     
}
export interface IWsConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWsConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE,
    readonly payload: {
        orders: TFeedItem[],
        total: number,
        totalToday: number
      }
} 

export type TWsActions =
  IWsConnectionStartAction |
  IWsConnectionSuccessAction |
  IWsConnectionErrorAction |
  IWsConnectionClosedAction |
  IWsGetMessageAction;

export const wsActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

export function WsConnectionStartAction(url: string): IWsConnectionStartAction {
    return ({
        type: WS_CONNECTION_START,
        payload: url
    });
}  

export function WsConnectionSuccessAction(): IWsConnectionSuccessAction {
    return ({
        type: WS_CONNECTION_SUCCESS
    });
}  

export function WsConnectionErrorAction(): IWsConnectionErrorAction {
    return ({
        type: WS_CONNECTION_ERROR
    });
}  

export function WsConnectionClosedAction(): IWsConnectionClosedAction {
    return ({
        type: WS_CONNECTION_CLOSED
    });
}  

export function WsGetMessageAction(message: { orders: TFeedItem[], total: number,totalToday: number }): IWsGetMessageAction {
    return ({
        type: WS_GET_MESSAGE,
        payload: message
    });
}  
import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
  } from '../constants';
import { TWsActions } from '../actions/ws';
import { TFeedItem } from '../types';

type TInitialState = {
    wsConnected: boolean,
    wsError: boolean,
    orders: TFeedItem[],
    total: number,
    totalToday: number
}
  
const initialState: TInitialState = {
    wsConnected: false,
    wsError: false,
    orders: [],
    total: 0,
    totalToday: 0
}

export const wsReducer = (state = initialState, action: TWsActions): TInitialState => {
    switch (action.type) {
        case WS_CONNECTION_START:
            return {
              ...state,
              wsConnected: false,
              wsError: false
            }        
        case WS_CONNECTION_SUCCESS:
            return {
              ...state,
              wsConnected: true,
              wsError: false
            }
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false,
                wsError: true
            }
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false,
                wsError: false,
                orders: []
            }
        case WS_GET_MESSAGE:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday
            }
        default:
            return state;
    }
}            
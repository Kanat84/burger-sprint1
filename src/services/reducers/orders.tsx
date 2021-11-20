import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,      
    CLEAR_ORDER,        
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_FAILED,
    CLEAR_ORDER_NUMBER
} from "../constants";
import { TOrdersActions } from '../actions/orders';
import { TFeedItem } from "../types";

type TInitialState = {
    order: TFeedItem[] | null;
    orderRequest: boolean,
    orderFailed: boolean,
    orderNumber: string | null,
    orderNumberRequest: boolean,
    orderNumberFailed: boolean
}

const initialState: TInitialState = {
    order: null,
    orderRequest: false,
    orderFailed: false,
    orderNumber: null,
    orderNumberRequest: false,
    orderNumberFailed: false,
}

export function ordersReducer(state = initialState, action: TOrdersActions): TInitialState {
    switch (action.type) {
        case GET_ORDER_FAILED:
            return {
                ...state,
                orderFailed: true
            }
        case GET_ORDER_REQUEST:
            return {
                ...state,
                orderRequest: true
            }
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                order: action.payload
            }
        case CLEAR_ORDER:
            return {
                ...state,
                order: null
            }        
        case GET_ORDER_NUMBER_REQUEST:
            return {
                ...state,
                orderRequest: true
            };
        case GET_ORDER_NUMBER_SUCCESS:
            return {
                ...state,
                orderNumber: action.payload
            };
        case GET_ORDER_NUMBER_FAILED:
            return {
                ...state,
                orderFailed: true
            };
        case CLEAR_ORDER_NUMBER:
            return {
                ...state,
                orderNumber: null
            };
        default:
            return state;
    }
}  
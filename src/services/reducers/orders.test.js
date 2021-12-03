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
import { initialState, ordersReducer } from "./orders";

const ordersFake = [
    { ingredient: 0 },
    { ingredient: 1 },
    { ingredient: 2 },
    { ingredient: 3 }
]

describe('orders reducer', () => {
    it('should return the initial state', () => {
        expect(ordersReducer(undefined, {})).toEqual(
            initialState
        )
    })
    it('should handle GET_ORDER_REQUEST', () => {
        expect(ordersReducer(initialState, { type: GET_ORDER_REQUEST })).toEqual(
            { ...initialState, orderRequest: true }
        )
    })
    it('should handle GET_ORDER_SUCCESS', () => {
        expect(ordersReducer(initialState, { type: GET_ORDER_SUCCESS, orders: { fake: 123456 }})).toEqual(
            { ...initialState, orderFailed: false, orderRequest: false, orders: { fake: 123456 }}
        )
    })    
    it('should handle GET_ORDER_FAILED', () => {
        expect(ordersReducer(initialState, { type: GET_ORDER_FAILED })).toEqual(
            { ...initialState, orderFailed: true }
        )
    })
    it('should handle CLEAR_ORDER', () => {
        expect(ordersReducer({...initialState, order: 123456 }, { type: CLEAR_ORDER })).toEqual(initialState)
    })
    it('should handle GET_ORDER_NUMBER_REQUEST', () => {
        expect(ordersReducer(initialState, { type: GET_ORDER_NUMBER_REQUEST })).toEqual(
            { ...initialState, orderNumberFailed: false, orderNumberRequest: true }
        )
    })
    it('should handle GET_ORDER_NUMBER_SUCCESS', () => {
        expect(ordersReducer(initialState, { type: GET_ORDER_NUMBER_SUCCESS, payload: 123456 })).toEqual(
            { ...initialState, orderNumberFailed: false, orderNumberRequest: false, orderNumber: 123456 }
        )
    })
    it('should handle GET_ORDER_NUMBER_FAILED', () => {
        expect(ordersReducer(initialState, { type: GET_ORDER_NUMBER_FAILED })).toEqual(
            { ...initialState, orderNumberFailed: true, orderNumberRequest: false }
        )
    })
    it('should handle CLEAR_ORDER_NUMBER', () => {
        expect(ordersReducer({ ...initialState, orderNumber: 123456 }, { type: CLEAR_ORDER_NUMBER })).toEqual(initialState)
    })
})
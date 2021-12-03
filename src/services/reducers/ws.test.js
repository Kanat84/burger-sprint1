import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../constants';
import { initialState, wsReducer } from "./ws";

const wsFake = [
    { ingredient: 0 },
    { ingredient: 1 },
    { ingredient: 2 },
    { ingredient: 3 }
]

describe('ws reducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(
            initialState
        )
    })
    it('should handle WS_CONNECTION_START', () => {
        expect(wsReducer(initialState, { type: WS_CONNECTION_START })).toEqual(
            { ...initialState, wsConnected: false, wsError: false }
        )
    })    
    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(wsReducer(initialState, { type: WS_CONNECTION_SUCCESS })).toEqual(
            { ...initialState, wsConnected: true, wsError: false }
        )
    })
    it('should handle WS_CONNECTION_ERROR', () => {
        expect(wsReducer(initialState, { type: WS_CONNECTION_ERROR })).toEqual(
            { ...initialState, wsConnected: false, wsError: true }
        )
    })
    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(wsReducer(initialState, { type: WS_CONNECTION_CLOSED })).toEqual(initialState)
    })
    it('should handle WS_GET_MESSAGE', () => {
        expect(wsReducer(initialState, { type: WS_GET_MESSAGE, payload: { orders: wsFake, totalToday: 10, total: 10 }})).toEqual(
            { ...initialState, orders: wsFake, total: 10, totalToday: 10 }
        )
    })
})
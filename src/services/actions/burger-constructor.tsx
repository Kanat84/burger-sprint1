import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    CLEAR_ORDER,
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    ADD_BUN_TO_CONSTRUCTOR,
    MOVE_INGREDIENT_IN_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR
  } from '../constants';
import { TBurgerConstructorProps } from '../../utils/prop-types';

export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly order: string; 
}
export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}
export interface IClearOrderAction {
    readonly type: typeof CLEAR_ORDER;
}
export interface IAddIngredientToConstructorAction {
    readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
    readonly item: TBurgerConstructorProps;
}
export interface IRemoveIngredientFromConstructorAction {
    readonly type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
    readonly id: string;
}
export interface IAddBunToConstructorAction {
    readonly type: typeof ADD_BUN_TO_CONSTRUCTOR;
    readonly item: TBurgerConstructorProps;
}
export interface IMoveIngredientInConstructorAction {
    readonly type: typeof MOVE_INGREDIENT_IN_CONSTRUCTOR;
    readonly dragIndex: number;
    readonly hoverIndex: number;    
}
export interface IClearConstructorAction {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}
export type TConstructorActions =
    IGetOrderRequestAction |
    IGetOrderSuccessAction |
    IGetOrderFailedAction |
    IClearOrderAction |
    IAddIngredientToConstructorAction |
    IRemoveIngredientFromConstructorAction |
    IAddBunToConstructorAction |
    IMoveIngredientInConstructorAction |
    IClearConstructorAction;

export function GetOrderRequestAction(): IGetOrderRequestAction {
    return ({
        type: GET_ORDER_REQUEST
    });
}
export function GetOrderSuccessAction(order: string): IGetOrderSuccessAction {
    return ({
        type: GET_ORDER_SUCCESS,
        order
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
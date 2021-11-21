import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_INGREDIENT_TO_MODAL,
    REMOVE_INGREDIENT_FROM_MODAL
  } from '../constants';
import { TBurgerIngredientProps } from '../../utils/prop-types';

export interface IGetIngredientsRequestsActions {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessActions {
    readonly type: typeof GET_INGREDIENTS_SUCCESS,
    readonly ingredients: TBurgerIngredientProps[]
}
export interface IGetIngredientsFailedActions {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface ISetIngredientToModalActions {
    readonly type: typeof SET_INGREDIENT_TO_MODAL;
    readonly item: TBurgerIngredientProps;
}
export interface IRemoveIngredientFromModalActions {
    readonly type: typeof REMOVE_INGREDIENT_FROM_MODAL;
}
export type TIngredientsActions =
    IGetIngredientsRequestsActions |
    IGetIngredientsSuccessActions |
    IGetIngredientsFailedActions |
    ISetIngredientToModalActions |
    IRemoveIngredientFromModalActions;

export function GetIngredientsRequestsActions(): IGetIngredientsRequestsActions {
    return ({
        type: GET_INGREDIENTS_REQUEST
    });
}
export function GetIngredientsSuccessActions(ingredients: TBurgerIngredientProps[]): IGetIngredientsSuccessActions {
    return ({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients
    });
}
export function GetIngredientsFailedActions(): IGetIngredientsFailedActions {
    return ({
        type: GET_INGREDIENTS_FAILED
    });
}

export function RemoveIngredientFromModalActions(): IRemoveIngredientFromModalActions {
    return ({
        type: REMOVE_INGREDIENT_FROM_MODAL
    });
}
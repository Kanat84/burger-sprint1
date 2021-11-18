import { apiURL } from "../../utils/consts";
import { getData } from "../../utils/funcs";
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_INGREDIENT_TO_MODAL,
    REMOVE_INGREDIENT_FROM_MODAL
  } from '../constants';
import { AppDispatch } from "../types";
import { TBurgerIngredientProps } from '../../utils/prop-types';

export interface IGetIngredientsRequestsActions {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessActions {
    readonly type: typeof GET_INGREDIENTS_SUCCESS,
    readonly ingredients: object
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
export function GetIngredientsSuccessActions(ingredients: object): IGetIngredientsSuccessActions {
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

export function getIngredients() {
    return function (dispatch: AppDispatch) {
        dispatch(GetIngredientsRequestsActions())
        getData(`${apiURL}/ingredients`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`Cannot get data from API. Status code: ${res.status}`);
            })
            .then(data => {
                if (data && data.success) {
                    dispatch(GetIngredientsSuccessActions(data.data))
                } else {
                    dispatch(GetIngredientsFailedActions())
                }
            })
            .catch(err => {
                console.log(err)
                dispatch(GetIngredientsFailedActions())
            })
    }
}
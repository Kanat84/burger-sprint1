import {
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    ADD_BUN_TO_CONSTRUCTOR,
    MOVE_INGREDIENT_IN_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR
  } from '../constants';
import { TBurgerConstructorProps } from '../../utils/prop-types';

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
    IAddIngredientToConstructorAction |
    IRemoveIngredientFromConstructorAction |
    IAddBunToConstructorAction |
    IMoveIngredientInConstructorAction |
    IClearConstructorAction;

export function AddBunToConstructorAction(item: TBurgerConstructorProps): IAddBunToConstructorAction {
    return ({
        type: ADD_BUN_TO_CONSTRUCTOR,
        item
    });
}
export function AddIngredientToConstructorAction(item: TBurgerConstructorProps): IAddIngredientToConstructorAction {
    return ({
        type: ADD_INGREDIENT_TO_CONSTRUCTOR,
        item
    });
}
export function MoveIngredientInConstructorAction(dragIndex: number, hoverIndex: number): IMoveIngredientInConstructorAction {
    return ({
        type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
        dragIndex, 
        hoverIndex
    });
}
export function RemoveIngredientFromConstructorAction(id: string): IRemoveIngredientFromConstructorAction {
    return ({
        type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
        id
    });
}
export function ClearConstructorAction(): IClearConstructorAction {
    return ({
        type: CLEAR_CONSTRUCTOR
    });
}
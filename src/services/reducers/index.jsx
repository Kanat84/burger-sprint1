import { combineReducers } from 'redux';
import { constructorReducer } from "./burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: constructorReducer
});
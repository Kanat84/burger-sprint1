import { combineReducers } from 'redux';
import { constructorReducer } from "./burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { usersReducer } from "./users";

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: constructorReducer,
    usersData: usersReducer    
});
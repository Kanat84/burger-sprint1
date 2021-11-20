import { combineReducers } from 'redux';
import { constructorReducer } from "./burger-constructor";
import { burgerIngredientsReducer } from "./burger-ingredients";
import { usersReducer } from "./users";
import { ordersReducer } from "./orders";
import { wsReducer } from './ws';

export const rootReducer = combineReducers({
    burgerIngredients: burgerIngredientsReducer,
    burgerConstructor: constructorReducer,
    usersData: usersReducer,
    ordersData: ordersReducer,
    wsData: wsReducer  
});
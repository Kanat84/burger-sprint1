//import { Action } from 'redux';
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import { ThunkAction } from 'redux-thunk';
//import { store } from "../store";
import { TUsersActions } from "../actions/users";
import { TConstructorActions } from "../actions/burger-constructor";
import { TIngredientsActions } from "../actions/burger-ingredients";
import { rootReducer } from "../../services/reducers";

export type TUser = {
    email: string;
    name: string;
}

export type TUserData = {
    name: string,
    email: string,
    password: string
}

export type TPasswordData = {
    password: string, 
    token: string 
}

type TApplicationActions = TUsersActions | TConstructorActions | TIngredientsActions;
//export type RootState = ReturnType<typeof store.getState>;
//export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    TApplicationActions
>

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = <TReturnType>(action: TApplicationActions | AppThunk | undefined) => TReturnType;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

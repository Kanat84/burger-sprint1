import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { store } from "../store";
import { TUsersActions } from "../actions/users";
import { TConstructorActions } from "../actions/burger-constructor";
import { TIngredientsActions } from "../actions/burger-ingredients";

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
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<
    ReturnType,
    Action,
    RootState,
    TApplicationActions
  >
>;
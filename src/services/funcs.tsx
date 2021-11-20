import { History } from 'history';
import { checkResponse, getUser, patchUser, getData, sendData, getCookie } from "../utils/funcs";
import { apiURL } from "../utils/constants";
import { TUserData, TPasswordData, AppDispatch, AppThunk } from "./types";
import { 
    GetUserRequestAction, GetUserFailedAction, GetUserSuccessAction, SetIsAuthAction, 
    DeleteIsAuthAction, GetUserInfoAction, ChangeUserInfoAction
} from "./actions/users"
import { GetOrderRequestAction, GetOrderFailedAction, GetOrderSuccessAction, 
    GetOrderNumberRequestsAction, GetOrderNumberSuccessAction, GetOrderNumberFailedAction, ClearOrderNumberAction } from "./actions/orders"
import { GetIngredientsRequestsActions, GetIngredientsSuccessActions, GetIngredientsFailedActions } from "./actions/burger-ingredients"

export function postForgotPassword(emailValue: string, history: History) {
    return function (dispatch: AppDispatch) {
        dispatch(GetUserRequestAction())
        sendData({
            url: `${apiURL}/password-reset`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {email: emailValue}
        })
            .then(res => checkResponse(res))
            .then(res => {
                    if (res && res.success) {
                        history.push('/reset-password');
                    } else {
                        dispatch(GetUserFailedAction())
                    }
                }
            )
            .catch(err => {
                console.log(err)
                dispatch(GetUserFailedAction())
            })
    }
}

export function postResetPassword(form: TPasswordData, history: History) {
    return function (dispatch: AppDispatch) {
        dispatch(GetUserRequestAction())
        sendData({
            url: `${apiURL}/password-reset/reset`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                password: form.password,
                token: form.token
            }
        })
            .then(res => checkResponse(res))
            .then(res => {
                    if (res && res.success) {
                        history.push('/login');
                    } else {
                        dispatch(GetUserFailedAction())
                    }
                }
            )
            .catch(err => {
                console.log(err)
                dispatch(GetUserFailedAction())
            })
    }
}

export function postRegister (form: TUserData, history: History) {
    return function (dispatch: AppDispatch) {
        dispatch(GetUserRequestAction())
        sendData({
            url: `${apiURL}/auth/register`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                email: form.email,
                password: form.password,
                name: form.name
            }
        })
            .then(res => checkResponse(res))
            .then(res => {
                    if (res && res.success) {
                        dispatch(GetUserSuccessAction(res.user));
                        dispatch(SetIsAuthAction(res.accessToken, res.refreshToken))
                        history.push({pathname: "/"});
                    } else {
                        dispatch(GetUserFailedAction())
                    }
                }
            )
            .catch(err => {
                console.log(err)
                dispatch(GetUserFailedAction())
            })
    }
}

export function postLogin(form: Omit<TUserData, 'name'>, history: History, from: { pathname: string }) {
    return function (dispatch: AppDispatch) {
        dispatch(GetUserRequestAction());
        sendData({
            url: `${apiURL}/auth/login`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: {
                email: form.email,
                password: form.password,
            }
        })
            .then(res => checkResponse(res))
            .then(res => {
                    if (res && res.success) {
                        dispatch(GetUserSuccessAction(res.user));
                        dispatch(SetIsAuthAction(res.accessToken, res.refreshToken))
                        history.replace(from)
                    } else {
                        dispatch(GetUserFailedAction())
                    }
                }
            )
            .catch(err => {
                console.log(err)
                alert(err.message)
                dispatch(GetUserFailedAction())
            })
    }
}

export function postLogout(history: History) {
    return function (dispatch: AppDispatch) {
        dispatch(GetUserRequestAction())
        sendData({
            url: `${apiURL}/auth/logout`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { token: localStorage.getItem('refreshToken') }
        })
            .then(res => checkResponse(res))
            .then(res => {
                    if (res && res.success) {
                        dispatch(DeleteIsAuthAction())
                        history.replace({pathname: '/login'})
                    } else {
                        dispatch(GetUserFailedAction())
                    }
                }
            )
            .catch(err => {
                console.log(err)
                alert(err.message)
                dispatch(GetUserFailedAction())
            })
    }
}

export function getUserInfo() {
    return async function (dispatch: AppDispatch) {
        dispatch(GetUserRequestAction())
        await getUser()
            .then(res => {
                    if (res && res.success) {
                        dispatch(GetUserInfoAction(res.user))
                    } else {
                        dispatch(GetUserFailedAction())
                    }
                }
            )
            .catch(err => {
                console.log(err)
                dispatch(GetUserFailedAction())
            })
    }
}

export function postChangeUserInfo(form: TUserData) {
    return async function (dispatch: AppDispatch) {
        dispatch(GetUserRequestAction())
        await patchUser(form)
        .then(res => {
            if (res && res.success) {
                dispatch(ChangeUserInfoAction(res.user))
            } else {
                dispatch(GetUserFailedAction())
            }
        })
        .catch(err => {
            console.log(err)
            dispatch(GetUserFailedAction())
        })
    }
}

export function postOrder(idsArr: string[]) {
    const accessToken = getCookie('token')
    return function (dispatch: AppDispatch) {
        dispatch(GetOrderNumberRequestsAction())
        sendData({
            url: `${apiURL}/orders`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': accessToken
            },
            body: {ingredients: idsArr}
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`Произошла непредвиденная ошибка: ${res.status}`)
        })
        .then(res => {
                if (res && res.success) {
                    dispatch(GetOrderNumberSuccessAction(res.order.number))
                } else {
                    dispatch(GetOrderNumberFailedAction())
                }
            }
        )
        .catch(err => {
            console.log(err)
            dispatch(GetOrderNumberFailedAction())
            dispatch(ClearOrderNumberAction())
        })
    }
}

export function getOrder (orderNumber: string): AppThunk {
    return function (dispatch: AppDispatch) {
      dispatch(GetOrderRequestAction())
      getData(`${apiURL}/orders/${orderNumber}`)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error(`Cannot get data from API. Status code: ${res.status}`);
        })
        .then(data => {
          if (data && data.success) {
            dispatch(GetOrderSuccessAction(data.orders))
          } else {
            dispatch(GetOrderFailedAction())
          }
        })
        .catch(err => {
          console.log(err)
          dispatch(GetOrderFailedAction())
        })
    }
}

export function getIngredients() {
    return function (dispatch: AppDispatch) {
        dispatch(GetIngredientsRequestsActions())
        getData(`${apiURL}/ingredients`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error(`При загрузке данных произошла ошибка: ${res.status}`);
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
//import { useSelector } from "react-redux";
import { Redirect, Route } from 'react-router-dom';
import { apiURL } from "./constants";
import { TSetCookieProps, TProtectedRouteProps, TSendDataProps } from './prop-types';
import { TUserData, RootState, useSelector } from '../services/types';

export async function sendData(options: TSendDataProps) {
    return await fetch(options.url, {
        method: options.method,
        headers: options.headers,
        body: JSON.stringify(options.body)
    })
}

export async function getData(url: string) {
    return await fetch(url)
}

export function refreshToken() {
    return fetch(`${apiURL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then(checkResponse);
};

export function getCookie(name: string) {
    // eslint-disable-next-line
    const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name: string, value: string, props: TSetCookieProps = {}) {
    props = {
        path: '/',
        ...props
    };
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp instanceof Date) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = (props as { [key: string]: string | boolean })[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
    setCookie(name, '', {expires: -1});
}

export async function fetchWithRefresh(url: string, options: RequestInit = {}) {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err: any) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken();
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            setCookie("token", refreshData.accessToken);
            (options.headers as { [key: string]: string }).authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export function checkResponse(res: Response) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function getUser() {
    const accessToken = getCookie('token')
    if (!accessToken) {
        return { user: null };
    }    
    return await fetchWithRefresh(`${apiURL}/auth/user`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': accessToken
        }
    })
}

export async function patchUser(form: TUserData) {
    const accessToken = getCookie('token')
    if (!accessToken) {
        return { user: null };
    }    
    return await fetchWithRefresh(`${apiURL}/auth/user`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'authorization': accessToken
        },
        body: JSON.stringify(form)
    })
}

export function ProtectedRoute({ children, exact, path }: TProtectedRouteProps) {
    const { isAuth } = useSelector((state: RootState) => state.usersData);
    return (
        <Route
            exact={exact}
            path={path}
            render={({ location }) =>
                isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
 }
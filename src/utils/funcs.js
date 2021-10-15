import { useSelector } from "react-redux";
import { Redirect, Route } from 'react-router-dom';
import { apiURL } from "./consts";

export async function sendData(options) {
    return await fetch(options.url, {
        method: options.method,
        headers: options.headers,
        body: JSON.stringify(options.body)
    })
}

export async function getData(url) {
    return await fetch(url)
}

export function calculateTotalPrice(items) {
    return items.reduce((acc, item) => {
        return item.type === 'bun' ? item.price * 2 + acc : item.price + acc;
    })
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

export function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props = {}) {
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
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function deleteCookie(name) {
    setCookie(name, null, {expires: -1});
}

export async function fetchWithRefresh(url, options) {
    try {
        const res = await fetch(url, options);
        return await checkResponse(res);
    } catch (err) {
        if (err.message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            setCookie("token", refreshData.accessToken);
            options.headers.authorization = refreshData.accessToken;
            const res = await fetch(url, options); //повторяем запрос
            return await checkResponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};

export function checkResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export async function getUser() {
    return await fetchWithRefresh(`${apiURL}/auth/user`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'authorization': getCookie('token')
        }
    })
}

export async function patchUser(formData) {
    return await fetchWithRefresh(`${apiURL}/auth/user`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'authorization': getCookie('token')
        },
        body: JSON.stringify(formData)
    })
}

export function ProtectedRoute({ children, exact, path }) {
    const {isAuth} = useSelector(state => state.usersData);
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
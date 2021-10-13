export const sendData = async (options) => {
    return await fetch(options.url, {
        method: options.method,
        headers: options.headers,
        body: JSON.stringify(options.body)
    })
}

export const getData = async (url) => {
    return await fetch(url)
}

export const calculateTotalPrice = (items) => {
    return items.reduce((acc, item) => {
        return item.type === 'bun' ? item.price * 2 + acc : item.price + acc;
    })
}

export const apiURL = 'https://norma.nomoreparties.space/api';


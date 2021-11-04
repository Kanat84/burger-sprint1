import { ReactElement, SyntheticEvent } from 'react';
//import PropTypes from 'prop-types';
import { Location } from 'history';
/*
export const dataPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v :PropTypes.number.isRequired
    });
*/
export type TIngredient = {
    _id: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    __v? : number 
    index: number;       
}

export type TBurgerIngredientDetailProps = {
    name: string,
    image: string,
    price: number,
    onOpen: (e: SyntheticEvent) => void,
    _id: string,
    type: string;
}

export type TIngredientDetailsProps = {
    id: string
}

export type TModalProps = {
    title?: string,
    onClose: () => void,
    children?: React.ReactNode;
}

export type TModalOverlayProps = {
    onClose: () => void,
    children?: React.ReactNode;
}

export type TOrderDetailsProps = {
    id: string
}

export type TLocationState = {
    background?: Location;
    state?: Location;
    location: Location;
}

export type TSetCookieProps = {
    expires?: number | Date | string;
    path?: string;
}

export type TProtectedRouteProps = {
    exact?: boolean;
    path: string;
    children?: React.ReactNode;
}

export type TBurgerConstructorProps = TIngredient & {
    onOpen: () => {},
    uuid: string;
}

export type TBurgerConstructorIngredientProps = TIngredient & {
    uuid: string;
}

export type TOptions = {
    url: string,
    method: string;
    headers: { "Content-Type": string }
    body?: {
        ingredients?: Array<string>;
        email?: string;
        password?: string;
        token?: string | null;
        name?: string;
    }
}


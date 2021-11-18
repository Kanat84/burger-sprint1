import { SyntheticEvent } from 'react';
import { Location } from 'history';

export type TBurgerIngredientProps = {
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

export type TBurgerConstructorProps = TBurgerIngredientProps & {
    onOpen: () => {},
    uuid: string;
}

export type TBurgerConstructorIngredientProps = TBurgerIngredientProps & {
    uuid: string;
}

export type TSendDataProps = {
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


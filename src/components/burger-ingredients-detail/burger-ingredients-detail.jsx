import React from 'react';
import burgerIngredientsDetailStyle from './burger-ingredients-detail.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

export default function BurgerIngredientDetail(props) {
    return (
        <div className={burgerIngredientsDetailStyle.product} onClick={props.onOpen} _id={props._id}>
            <img className={`${burgerIngredientsDetailStyle.image} pr-4 pl-4`} src={props.image} alt=""/>
            <div className={`${burgerIngredientsDetailStyle.price} mt-1 mb-1`}>
                <span className='text text_type_digits-default mr-2'>{props.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${burgerIngredientsDetailStyle.name} text text_type_main-default mt-1 mb-10`}>{props.name}</p>
        </div>
    )
}

BurgerIngredientDetail.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    onOpen: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired
}
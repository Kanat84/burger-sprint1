import React from 'react';
import ingredientDetailsStyle from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import dataPropTypes from "../../utils/prop-types";

export default function IngredientDetails (props) {
    return (
        <div className={ingredientDetailsStyle.body}>
            <img src={props.data.image_large} alt={props.data.name} className="mb-4" />
            <p className={`${ingredientDetailsStyle.title} text text_type_main-medium mb-8`}>{props.data.name}</p>
            <div className={ingredientDetailsStyle.card}>
                <div className={`${ingredientDetailsStyle.text} mr-5`}>
                    <p className="text text_type_main-default">Калории, ккал</p>
                    <p className="text text_type_digits-default">{props.data.calories}</p>
                </div>
                <div className={`${ingredientDetailsStyle.text} mr-5`}>
                    <p className="text text_type_main-default">Белки, г</p>
                    <p className="text text_type_digits-default">{props.data.proteins}</p>
                </div>
                <div className={`${ingredientDetailsStyle.text} mr-5`}>
                    <p className="text text_type_main-default">Жиры, г</p>
                    <p className="text text_type_digits-default">{props.data.fat}</p>
                </div>
                <div className={ingredientDetailsStyle.text}>
                    <p className="text text_type_main-default">Углеводы, г</p>
                    <p className="text text_type_digits-default">{props.data.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
};

IngredientDetails.propTypes = { ingredients: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired }

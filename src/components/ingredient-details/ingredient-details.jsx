//import React from 'react';
import style from './ingredient-details.module.css';
import PropTypes from 'prop-types';

export default function IngredientDetails (props) {
    return (
        <div className={style.body}>
            <img src={props.data.image_large} alt={props.data.name} className="mb-4" />
            <p className={`${style.title} text text_type_main-medium mb-8`}>{props.data.name}</p>
            <div className={`${style.card}`}>
                <div className={`${style.text} mr-5`}>
                    <p className="text text_type_main-default">Калории, ккал</p>
                    <p className="text text_type_digits-default">{props.data.calories}</p>
                </div>
                <div className={`${style.text} mr-5`}>
                    <p className="text text_type_main-default">Белки, г</p>
                    <p className="text text_type_digits-default">{props.data.proteins}</p>
                </div>
                <div className={`${style.text} mr-5`}>
                    <p className="text text_type_main-default">Жиры, г</p>
                    <p className="text text_type_digits-default">{props.data.fat}</p>
                </div>
                <div className={style.text}>
                    <p className="text text_type_main-default">Углеводы, г</p>
                    <p className="text text_type_digits-default">{props.data.carbohydrates}</p>
                </div>
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    data: PropTypes.shape({
        image_large: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
    }).isRequired
};
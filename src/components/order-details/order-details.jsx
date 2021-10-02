import React from 'react';
import orderDetailsStyle from './order-details.module.css';
import imgDone from '../../images/image.svg';
import PropTypes from 'prop-types';

export default function OrderDetails ({id}) {
  return (
    <div className={`${orderDetailsStyle.order} pb-15`}>
      <h3 className={`${orderDetailsStyle.title} text text_primary_ligth text_type_digits-large`}>{id}</h3>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <div className={`${orderDetailsStyle.status} mt-15 mb-15`}> 
        <img src={imgDone} alt="готово" />
      </div>     
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className={`${orderDetailsStyle.subtitle} text text_type_main-default mt-2`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

OrderDetails.propTypes = { id: PropTypes.number.isRequired }
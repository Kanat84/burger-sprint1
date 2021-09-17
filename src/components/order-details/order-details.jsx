import React from 'react';
import orderDetailsStyle from './order-details.module.css';
import imgDone from '../../images/image.svg';
//import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function OrderDetails () {
  return (
    <div className={orderDetailsStyle.box}>
      <p className={`${orderDetailsStyle.title} text text_type_digits-large`}>034536</p>
      <p className="mt-8 mb-15 text text_type_main-medium">идентификатор заказа</p>
      <img src={imgDone} alt="готово" />
      <p className="mt-15 mb-2 text text_type_main-default">Ваш заказ начали готовить</p>
      <p className={`${orderDetailsStyle.subtitle} mb-30 text text_type_main-default`}>Дождитесь готовности на орбитальной станции</p>
    </div>
  );

};


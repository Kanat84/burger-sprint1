import { useEffect } from 'react';
import style from './order-details.module.css';
import imgDone from '../../images/image.svg';
import { RootState, useDispatch, useSelector } from '../../services/types';
import { ClearConstructorAction } from '../../services/actions/burger-constructor'

export default function OrderDetails() {
  const { orderNumber } = useSelector((state: RootState) => state.ordersData)
  const dispatch = useDispatch();
  useEffect(() => {
    if (orderNumber) {
        dispatch(ClearConstructorAction())
      }
  }, [orderNumber, dispatch])

  return (
    <>
      {!orderNumber && (<h1>Идет загрузка...</h1>)}
      {orderNumber &&
        <div className={`${style.order} pb-15`}>
          <h3 className={`${style.title} text text_primary_ligth text_type_digits-large`}>{orderNumber}</h3>
          <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
          <div className={`${style.status} mt-15 mb-15`}> 
            <img src={imgDone} alt="готово" />
          </div>     
          <p className="text text_type_main-default">Ваш заказ начали готовить</p>
          <p className={`${style.subtitle} text text_type_main-default mt-2`}>Дождитесь готовности на орбитальной станции</p>
        </div>
      }
    </> 
  );
};
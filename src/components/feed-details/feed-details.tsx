import { useEffect, useMemo } from 'react';
import { useParams, useHistory, useLocation } from "react-router-dom"
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from './feed-details.module.css';
import { getOrder } from "../../services/funcs";
import { getDate } from "../../utils/funcs";
import { useDispatch, useSelector, TFeedItem } from '../../services/types';
import { TLocationState } from "../../utils/prop-types";

export default function FeedDetail() {
    const { id }: { id: string; } = useParams();
    const dispatch = useDispatch();
    const location = useLocation<TLocationState>();
    const history = useHistory();
    const background = (history.action === 'PUSH' || history.action === 'REPLACE') && location.state && location.state.background;    
    const { orders } = useSelector((state) => state.wsData);
    const { order } = useSelector((state) => state.ordersData);
    const { ingredients } = useSelector((state) => state.burgerIngredients);
    let currOrder: TFeedItem | undefined | null;
    useEffect(() => {
        if (orders.length === 0) {
            dispatch(getOrder(id));
        }
    }, [dispatch, orders, id]);
    if (orders.length !== 0) {
        currOrder = orders.find((item) => item.number === Number(id));
    } else {
        currOrder = order && order.find((item) => item.number === Number(id));
    }

    const orderIngredients = useMemo(() => {
        return Array.from(new Set(currOrder?.ingredients)).map((ingredient) => {
            return ingredients.find((item) => item._id === ingredient);
        });;
    }, [currOrder, ingredients]);

    const price = useMemo(() => {
        return orderIngredients.reduce((acc, item) => {
            if (item && item.type === 'bun') {
                acc += item && item.price * 2;
            } else if (item) {
                acc += item && item.price;
            }
            return acc;
        }, 0);
    }, [orderIngredients]);

    return (
        <>
            {orderIngredients.length === 0 && (<h1>Идет загрузка...</h1>)}
            {currOrder && orderIngredients.length > 0 && (
                <div className={`${style.feed}`}>
                    <p className={`text text_type_digits-default ${style.title} ${!background && 'mt-15'}`}>#{currOrder?.number}</p>
                    <p className={`text text_type_main-medium  mt-10`}>{currOrder?.name}</p>
                    <p className={`text text_type_main-default text_color_success mt-2`}>{currOrder?.status === 'done' ? 'Выполнен' : 'В работе'}</p>
                    <p className={`text text_type_main-medium mt-15 mb-6`}>Состав:</p>
                    <div className={`${style.ingredients} custom-scroll`}>
                        {orderIngredients && orderIngredients.map((item, index) => {
                            return (
                                <div key={index} className={`${style.ingredient}`}>
                                    <div className={`${style.ingredient__info}`}>
                                        <img src={item?.image_mobile} alt=""
                                            className={`${style.ingredient__image}`} />
                                        <p className="text text_type_main-default ml-4">{item?.name}</p>
                                    </div>
                                    <div className={`${style.ingredient__price}`}>
                                        <span className={`text text_type_digits-default mr-2`}>{item?.type === 'bun' ? 2 : 1} x {item?.price}</span>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                    <div className={`${style.feed__footer}`}>
                        <p className={`text text_type_main-default ml-4 text_color_inactive`}>{getDate(currOrder?.createdAt)}</p>
                        <div className={`total__${style.ingredient__price}`}>
                            <span className={`text text_type_digits-default mr-2`}>{price}</span>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
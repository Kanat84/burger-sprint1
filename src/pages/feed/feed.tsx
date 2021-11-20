import { useEffect } from 'react';
import style from './feed.module.css';
import FeedItem from "../../components/feed-item/feed-item";
import {  WsConnectionStartAction, WsConnectionClosedAction } from "../../services/actions/ws";
import { wssURL } from "../../utils/constants";
import { RootState, useDispatch, useSelector } from '../../services/types';

export default function FeedPage () {
    const dispatch = useDispatch();
    const { orders, total, totalToday, wsConnected, wsError } = useSelector((state: RootState) => state.wsData);
    useEffect(() => {       
        dispatch(WsConnectionStartAction(`${wssURL}/all`));   
        return () => {
        dispatch(WsConnectionClosedAction());
        }
    }, [dispatch])

    return (
        <>
            {wsError && <h1 style={{textAlign: "center"}}>Произошла ошибка, попробуйте позже...</h1>}
            {!wsError && wsConnected && orders && orders.length === 0 && (<h1 style={{ textAlign: "center" }}>Идет загрузка...</h1>)}
            {(total && totalToday && orders.length !== 0) ? (
                <>
                    <div className={style.feeds__container}>
                    <h1 className="text text_type_main-large mt-10 text_colo">Лента заказов</h1>
                        <div className={`${style.feeds} mt-5 custom-scroll`}>
                            {orders.map((item, index) => <FeedItem data={item} key={index} />)}
                        </div>
                    </div>
                    <div className={`${style.feed__info}`}>
                        <div className={style.feed__board}>
                            <div className={style.feed__boardLeft}>
                                <p className={`text text_type_main-medium mb-6`}>Готовы</p>
                                <ul className={style.feed__completed}>
                                    {orders
                                    .filter((item) => item.status === 'done')
                                    .map((item, index) => (<li className={`text text_type_digits-small text_color_success`} key={index}>{item.number}</li>))
                                    }
                                </ul>
                            </div>
                            <div className={style.feed__boardRight}>
                                <p className={`text text_type_main-medium mb-6`}>В работе:</p>
                                <ul className={style.feed__inProgress}>
                                    {orders
                                    .filter((item) => item.status === 'pending')
                                    .map((item, index) => (<li className={`text text_type_digits-small text_color_success`} key={index}>{item.number}</li>))
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="feed__allCount mt-15">
                            <p className={`text text_type_main-default`}>Выполнено за все время:</p>
                            <p className={`text text_type_digits-large text_color_primary ${style.feed__mainTitle}`}>{total}</p>
                        </div>
                        <div className="feed__todayCount mt-15">
                            <p className={`text text_type_main-default`}>Выполнено за сегодня:</p>
                            <p className={`text text_type_digits-large  text_color_primary ${style.feed__mainTitle}`}>{totalToday}</p>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
}
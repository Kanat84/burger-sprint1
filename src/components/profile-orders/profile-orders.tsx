import { useEffect } from 'react';
import style from "./profile-orders.module.css";
import FeedItem from "../feed-item/feed-item";
import { WsConnectionStartAction, WsConnectionClosedAction } from "../../services/actions/ws";
import { wssURL } from "../../utils/constants";
import { getCookie } from "../../utils/funcs";
import { RootState, useDispatch, useSelector } from '../../services/types';

export default function ProfileOrders() {
    const { orders, wsConnected, wsError } = useSelector((state: RootState) => state.wsData);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = getCookie('token')?.replace('Bearer ', '');
        dispatch(WsConnectionStartAction(`${wssURL}?token=${token}`));
        return () => {
            dispatch(WsConnectionClosedAction());
        };
    }, [dispatch]);

    return (
        <>
            {wsError && (<h1 style={{textAlign: "center"}}>Произошла ошибка, попробуйте позже...</h1>)}
            {!wsError && wsConnected && orders.length === 0 && <h1 style={{ textAlign: "center" }}>Идет загрузка...</h1>}
            {(!wsError && wsConnected && orders && orders.length !== 0) ? (
                <div className={`${style.orders} mt-8 custom-scroll`}>
                    {orders.map((item, index) => <FeedItem data={item} key={index} />)}
                </div>
            ): null}
        </>
    );
}
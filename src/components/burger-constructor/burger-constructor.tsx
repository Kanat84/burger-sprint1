import { useMemo } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import { useDrop } from "react-dnd";
import style from './burger-constructor.module.css';
import { Button, CurrencyIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { v4 as uuidv4 } from 'uuid';
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import { postOrder } from "../../services/funcs";
import { TBurgerConstructorProps } from '../../utils/prop-types';
import { AddBunToConstructorAction,  AddIngredientToConstructorAction, ClearConstructorAction } from '../../services/actions/burger-constructor'  
import { ClearOrderNumberAction } from '../../services/actions/orders'  
import { RootState, useDispatch, useSelector } from '../../services/types';

export default function BurgerConstructor() {  
    const { ingredients, bun, orderNumber, isAuth } = useSelector((state: RootState) => ({
        ingredients: state.burgerConstructor.ingredients,
        bun: state.burgerConstructor.bun,
        orderNumber: state.ordersData.orderNumber,
        isAuth: state.usersData.isAuth      
    }));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    function moveIngredient (ingredient: TBurgerConstructorProps) {
        dispatch((ingredient.type === 'bun') ? AddBunToConstructorAction({...ingredient, uuid: uuidv4()}) :     
            AddIngredientToConstructorAction({...ingredient, uuid: uuidv4()}))            
    }
    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredients',
        collect: monitor => ({ isHover: monitor.isOver() }),
        drop(item: TBurgerConstructorProps) { moveIngredient(item); }
    });
    function handleOpenModal () {
        dispatch(ClearOrderNumberAction());
        if (!isAuth) {
            return history.push('/login');
        }        
        if (!bun) { 
            return alert('Выберите булочку'); 
        }        
        const idsArr = [...ingredients.map((item) => item._id), bun._id, bun._id];
        dispatch(postOrder(idsArr));
        history.push({
            pathname: "/sendOrder",
            state: {
                background: location,
            },
        });
        orderNumber && dispatch(ClearConstructorAction())     
    }
    const totalPrice = useMemo(() => {
        let price = ingredients.reduce((acc, item) => { return item.price + acc; }, 0);
        bun && (price += bun.price * 2);
        return price;
    }, [ingredients, bun])

    return (
        <>
            <div ref={dropTarget} className={`${style.constructor} mt-25`}>
                <ul className={`${style.list}`}>
                    <li className={`${style.item} ${isHover ? style.item_isHovering : ''}`}>
                        {bun ? (                        
                            <ConstructorElement type="top" isLocked={true} text={`${bun.name} (верх)`} price={bun.price} thumbnail={bun.image} />
                        ) : (
                            <div className={`${style.nobun_top} text text_type_main-default`}><p>Выберите булочку</p></div>
                        )}                        
                    </li>
                    <li className={`${style.item} ${isHover ? style.item_isHovering : ''}`}>
                        <ul className={style.list__scroll} style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: "flex-end"}}>
                            {ingredients.map((item, idx: number) => {
                                return <BurgerConstructorItem {...item} index={idx} key={item.uuid} />
                            })}
                        </ul>
                    </li>                    
                    <li className={`${style.item} ${isHover ? style.item_isHovering : ''}`}>
                        {bun ? (
                            <ConstructorElement type="bottom" isLocked={true} text={`${bun.name} (низ)`} price={bun.price} thumbnail={bun.image} />
                        ) : (
                            <div className={`${style.nobun_bottom} text text_type_main-default`}><p>Выберите булочку</p></div>
                        )}
                    </li>
                </ul>
                {(ingredients || bun) && (
                    <div className={`${style.price__box} mr-8`}>
                        <div className={`${style.price} mr-10`}>
                            <span className="text text_type_digits-medium">{totalPrice}</span>
                            <CurrencyIcon type="primary" />
                        </div>
                        <Button type="primary" size="medium" onClick={handleOpenModal}>Оформить заказ</Button>
                    </div>
                )}
            </div>
        </>
    );
}
import React, { useState, useMemo } from 'react';
import constructorStyle from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import dataPropTypes from "../../utils/prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import BurgerConstructorIngredient from "../burger-constructor-item/burger-constructor-item";
import { ADD_BUN_TO_CONSTRUCTOR, ADD_INGREDIENT_TO_CONSTRUCTOR, CLEAR_CONSTRUCTOR, CLEAR_ORDER, postOrder } from "../../services/actions/burger-constructor";

export default function BurgerConstructor() {  
    const [modalActive, setModalActive] = useState(false);

    const { ingredients, bun, order } = useSelector(state => ({
        ingredients: state.burgerConstructor.ingredients,
        bun: state.burgerConstructor.bun,
        order: state.burgerConstructor.order
    }));
    const dispatch = useDispatch();

    const moveIngredient = (ingredient) => {
        dispatch({ type: ingredient.type === 'bun' ? ADD_BUN_TO_CONSTRUCTOR : ADD_INGREDIENT_TO_CONSTRUCTOR,
            item: {...ingredient, uuid: uuidv4()}
        })
    }
    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredients',
        collect: monitor => ({ isHover: monitor.isOver() }),
        drop(item) { moveIngredient(item); }
    });

    const handleOpenModal = () => {
        if (!bun) { return alert('Выберите булку'); }
        const idsArr = [...ingredients.map(item => item._id), bun._id, bun._id];
        dispatch(postOrder(idsArr));
        setModalActive(true)
    }

    const handleClose = () => {
        dispatch({ type: CLEAR_ORDER })
        dispatch({ type: CLEAR_CONSTRUCTOR })
        setModalActive(false);
    }

    const totalPrice = useMemo(() => {
        let price = ingredients.reduce((acc, item) => {
            return item.price + acc;
        }, 0);
        price += bun && bun.price * 2;
        return price;
    }, [ingredients, bun])

    return (
        <>
            <div ref={dropTarget} className={`${constructorStyle.constructor} mt-25`}>
                <ul className={`${constructorStyle.list}`}>
                    <li className={`${constructorStyle.item} ${isHover ? constructorStyle.item_isHovering : ''}`}>
                        {bun ? (                        
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        ) : (
                            <div className={`${constructorStyle.nobun_top} text text_type_main-default`}>
                                <p>Выберите булочку</p>
                            </div>
                        )}                        
                    </li>
                    <li className={`${constructorStyle.item} ${isHover ? constructorStyle.item_isHovering : ''}`}>
                        <ul className={constructorStyle.list__scroll} style={{display: 'flex', flexDirection: 'column', gap: '10px', alignItems: "flex-end"}}>
                            {ingredients.map((item, idx) => {
                                return <BurgerConstructorIngredient {...item} index={idx} key={item.uuid}/>
                            })}
                        </ul>
                    </li>                    
                    <li className={`${constructorStyle.item} ${isHover ? constructorStyle.item_isHovering : ''}`}>
                        {bun ? (
                            <ConstructorElement 
                                type="bottom" 
                                isLocked={true} 
                                text={`${bun.name} (низ)`}
                                price={bun.price}
                                thumbnail={bun.image}
                            />
                        ) : (
                            <div className={`${constructorStyle.nobun_bottom} text text_type_main-default`}>
                                <p>Выберите булочку</p>
                            </div>
                        )}
                    </li>
                </ul>
                {(ingredients || bun) && (
                    <div className={`${constructorStyle.price__box} mr-8`}>
                        <div className={`${constructorStyle.price} mr-10`}>
                            <span className="text text_type_digits-medium">{totalPrice}</span>
                            <CurrencyIcon type="primary" />
                        </div>
                        <Button type="primary" size="medium" onClick={handleOpenModal}>
                            Оформить заказ
                        </Button>
                    </div>
                )}
            </div>
            {modalActive &&
            <Modal onClose={handleClose}>
                <OrderDetails id={order} />
            </Modal>
            }
        </>
    );
}

BurgerConstructor.propTypes = { ingredients: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired }

import React, { createRef, useState, useEffect } from 'react';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import appStyles from '../app/app.module.css';
import BurgerIngrediensDetail from "../burger-ingredients-detail/burger-ingredients-detail";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
//import PropTypes from 'prop-types';
//import dataPropTypes from "../../utils/prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_INGREDIENT_FROM_MODAL, SET_INGREDIENT_TO_MODAL, getIngredients } from "../../services/actions/burger-ingredients";

export default function BurgerIngredients() {
    const [current, setCurrent] = useState('bun');
    const [modalActive, setModalActive] = useState(false);
    const { ingredients, ingredientsRequest, ingredientsError, ingredientDetails } = useSelector(state => state.burgerIngredients) 
    const bunsRef = createRef();
    const saucesRef = createRef();
    const mainsRef  = createRef();        
    const dispatch = useDispatch();
    useEffect(() => { dispatch(getIngredients()) }, [dispatch]);

    function handleCloseModal () {
        setModalActive(false);
        dispatch({ type: REMOVE_INGREDIENT_FROM_MODAL })
    }
    function handleTabClick (value) { 
        setCurrent(value); 
    }
    function handleOpenModal (e) {
        const tar = e.currentTarget;
        const id = tar.getAttribute('_id');
        dispatch({ type: SET_INGREDIENT_TO_MODAL, item: ingredients.find((item) => item._id === id) })        
        setModalActive(true);
    }    
    function handleScroll (e) {
        const scrollContainer = e.target;
        const saucesContainer = saucesRef.current.getBoundingClientRect();
        const mainsContainer = mainsRef.current.getBoundingClientRect();
        if (scrollContainer.offsetTop - saucesContainer.top < 0) {
            setCurrent('bun');
        } else if (scrollContainer.offsetTop - mainsContainer.top < 0) {
            setCurrent('sauce');
        } else {
            setCurrent('main');
        }
    }

    return (
        <>
            {ingredientsRequest && !ingredientsError && ( <h1>Идет загрузка...</h1> )}
            {ingredientsError && !ingredientsRequest && ( <h1>Произошла ошибка попробуйте позже</h1> )}
            {!ingredientsError && !ingredientsRequest && ingredients.length > 0 && (
                <div className={burgerIngredientsStyle.constructor }>
                    <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
                    <div style={{ display: 'flex' }} className='mt-5'>
                        <a className={appStyles.link} href="#bun">
                            <Tab value="bun" active={current === 'bun'} onClick={handleTabClick}>Булка</Tab>
                        </a>
                        <a className={appStyles.link} href="#sauce">
                            <Tab value="sauce" active={current === 'sauce'} onClick={handleTabClick}>Соусы</Tab>
                        </a>
                        <a className={appStyles.link} href="#main">
                            <Tab value="main" active={current === 'main'} onClick={handleTabClick}>Начинки</Tab>
                        </a>
                    </div>
                    <div className={`${burgerIngredientsStyle.ingredients} mt-10`}>
                        <div className={burgerIngredientsStyle.products} onScroll={handleScroll}>
                            <h3 className="text text_type_main-medium" ref={bunsRef} id="bun">Булки</h3>
                            <div className={burgerIngredientsStyle.products__cont}>
                                {ingredients.filter((item) => item.type === 'bun').map((item) => <BurgerIngrediensDetail onOpen={handleOpenModal} {...item} key={item._id} />)}
                            </div>
                            <h3 className="text text_type_main-medium" ref={saucesRef} id="sauce">Соусы</h3>
                            <div className={burgerIngredientsStyle.products__cont}>
                                {ingredients.filter((item) => item.type === 'sauce').map((item) => <BurgerIngrediensDetail onOpen={handleOpenModal} {...item} key={item._id} />)}
                            </div>
                            <h3 className="text text_type_main-medium" ref={mainsRef} id="main">Начинки</h3>
                            <div className={burgerIngredientsStyle.products__cont}>
                                {ingredients.filter((item) => item.type === 'main').map((item) => <BurgerIngrediensDetail onOpen={handleOpenModal} {...item} key={item._id} />)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {modalActive && ingredientDetails && (
                <Modal onClose={handleCloseModal} title={'Детали ингредиента'}>
                    <IngredientDetails data={ingredientDetails} />
                </Modal>)
            }
        </>
    );

}

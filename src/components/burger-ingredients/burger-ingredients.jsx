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
import {
    getIngredients,
    REMOVE_INGREDIENT_FROM_MODAL,
    SET_INGREDIENT_TO_MODAL
} from "../../services/actions/burger-ingredients";

export default function BurgerIngredients() {
    const [current, setCurrent] = useState('bun');
    const [modalActive, setModalActive] = useState(false);
    //const [modalData, setModalData] = React.useState({});
    const {ingredients, ingredientsRequest, ingredientsError/*, ingredientDetails*/} = useSelector(state => state.burgerIngredients) 
    const bunsRef = createRef();
    const saucesRef = createRef();
    const mainsRef = createRef();
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
            setCurrent('buns');
        } else if (scrollContainer.offsetTop - mainsContainer.top < 0) {
            setCurrent('sauces');
        } else {
            setCurrent('mains');
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
                        <a className={appStyles.link} href="#buns">
                            <Tab value="bun" active={current === 'bun'} onClick={handleTabClick}>Булка</Tab>
                        </a>
                        <a className={appStyles.link} href="#sauces">
                            <Tab value="sauce" active={current === 'sauce'} onClick={handleTabClick}>Соусы</Tab>
                        </a>
                        <a className={appStyles.link} href="#mains">
                            <Tab value="main" active={current === 'main'} onClick={handleTabClick}>Начинки</Tab>
                        </a>
                    </div>
                    <div className={`${burgerIngredientsStyle.ingredients} mt-10`}>
                        <div className={burgerIngredientsStyle.products} onScroll={handleScroll}>
                            <h3 className="text text_type_main-medium" ref={bunsRef} id="buns">Булки</h3>
                            <div className={burgerIngredientsStyle.products__cont}>
                                {ingredients.filter((item) => item.type === 'bun').map((item) => <BurgerIngrediensDetail onOpen={handleOpenModal} {...item} key={item._id} />)}
                            </div>
                            <h3 className="text text_type_main-medium" ref={saucesRef} id="sauces">Соусы</h3>
                            <div className={burgerIngredientsStyle.products__cont}>
                                {ingredients.filter((item) => item.type === 'sauce').map((item) => <BurgerIngrediensDetail onOpen={handleOpenModal} {...item} key={item._id} />)}
                            </div>
                            <h3 className="text text_type_main-medium" ref={mainsRef} id="mains">Начинки</h3>
                            <div className={burgerIngredientsStyle.products__cont}>
                                {ingredients.filter((item) => item.type === 'main').map((item) => <BurgerIngrediensDetail onOpen={handleOpenModal} {...item} key={item._id} />)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {modalActive && IngredientDetails && (
                <Modal onClose={handleCloseModal} title={'Детали ингредиента'}>
                    <IngredientDetails data={IngredientDetails} />
                </Modal>)
            }
        </>
    );

}

//BurgerIngredients.propTypes = { ingredients: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired }

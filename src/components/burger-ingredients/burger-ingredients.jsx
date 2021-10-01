import React, { createRef, useEffect } from 'react';
import burgerIngredientsStyle from './burger-ingredients.module.css';
import appStyles from '../app/app.module.css';
import BurgerIngrediensDetail from "../burger-ingredients-detail/burger-ingredients-detail";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import dataPropTypes from "../../utils/prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useDispatch, useSelector } from "react-redux";
import {
    getIngredients,
    REMOVE_INGREDIENT_FROM_MODAL,
    SET_INGREDIENT_TO_MODAL
} from "../../services/actions/burger-ingredients";

export default function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('but');
    const [modalActive, setModalActive] = React.useState(false);
    const [modalData, setModalData] = React.useState({});
    
    const handleCloseModal = () => { 
        setModalActive(false); 
    }
    const handleTabClick = (value) => { 
        setCurrent(value); 
    }
    const handleOpenModal = (e) => {
        const tar = e.currentTarget;
        const id = tar.getAttribute('_id');
        setModalData(props.ingredients.find((item) => item._id === id));
        setModalActive(true);
    }    
    return (
        <>
            <div className={burgerIngredientsStyle.constructor }>
                <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
                <div style={{ display: 'flex' }} className='mt-5'>
                    <a className={appStyles.link} href="#buts">
                        <Tab value="but" active={current === 'but'} onClick={handleTabClick}>Булка</Tab>
                    </a>
                    <a className={appStyles.link} href="#sauces">
                        <Tab value="sauce" active={current === 'sauce'} onClick={handleTabClick}>Соусы</Tab>
                    </a>
                    <a className={appStyles.link} href="#mains">
                        <Tab value="main" active={current === 'main'} onClick={handleTabClick}>Начинки</Tab>
                    </a>
                </div>
                <div className={`${burgerIngredientsStyle.ingredients} mt-10`}>
                    <div className={burgerIngredientsStyle.products}>
                        <h3 className="text text_type_main-medium" id="buts">Булки</h3>
                        <div className={burgerIngredientsStyle.products__cont}>
                            {props.ingredients.filter((item) => item.type === 'bun').map((item) => <BurgerIngrediensDetail onOpen={handleOpenModal} {...item} key={item._id} />)}
                        </div>
                        <h3 className="text text_type_main-medium" id="sauces">Соусы</h3>
                        <div className={burgerIngredientsStyle.products__cont}>
                            {props.ingredients.filter((item) => item.type === 'sauce').map((item) => <BurgerIngrediensDetail onOpen={handleOpenModal} {...item} key={item._id} />)}
                        </div>
                        <h3 className="text text_type_main-medium" id="mains">Начинки</h3>
                        <div className={burgerIngredientsStyle.products__cont}>
                            {props.ingredients.filter((item) => item.type === 'main').map((item) => <BurgerIngrediensDetail onOpen={handleOpenModal} {...item} key={item._id} />)}
                        </div>
                    </div>
                </div>
            </div>
            {modalActive && modalData && (
                <Modal onClose={handleCloseModal} title={'Детали ингредиента'}>
                    <IngredientDetails data={modalData} />
                </Modal>)
            }
        </>
    );

}

BurgerIngredients.propTypes = { ingredients: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired }

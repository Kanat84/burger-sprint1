import { createRef, useState, SyntheticEvent } from 'react';
//import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import style from './burger-ingredients.module.css';
import appStyles from '../app/app.module.css';
import BurgerIngrediensDetail from "../burger-ingredients-detail/burger-ingredients-detail";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
//import Modal from "../modal/modal";
//import IngredientDetails from "../ingredient-details/ingredient-details";
import { TBurgerIngredientProps } from '../../utils/prop-types';
import {
   // REMOVE_INGREDIENT_FROM_MODAL,
    SET_INGREDIENT_TO_MODAL
  } from '../../services/constants';
import { RootState, useDispatch, useSelector } from '../../services/types';

export default function BurgerIngredients(): JSX.Element { 
    const [current, setCurrent] = useState<string>('bun');
    const [modalActive, setModalActive] = useState<boolean>(false);
    const { ingredients, ingredientsRequest, ingredientsError, ingredientDetails }: any = useSelector((state:RootState)=> state.burgerIngredients) 
    const bunsRef = createRef<HTMLDivElement>();
    const saucesRef = createRef<HTMLDivElement>();
    const mainsRef  = createRef<HTMLDivElement>(); 
    const scrollRef = createRef<HTMLDivElement>();    
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

  /*  function handleCloseModal () {
        setModalActive(false);
        dispatch({ type: REMOVE_INGREDIENT_FROM_MODAL })
        history.replace(location);
    }*/
    function handleTabClick (value: string) { 
        setCurrent(value); 
    }
    function handleOpenModal (e: SyntheticEvent) {
        const tar = e.currentTarget;
        const id = tar.getAttribute('id');
        dispatch({ type: SET_INGREDIENT_TO_MODAL, item: ingredients.find((item: TBurgerIngredientProps) => item._id === id) })        
        setModalActive(true);
    }    
    function handleScroll (e: SyntheticEvent) {           
        const scrollContainer = scrollRef.current;
        const saucesContainer = saucesRef.current?.getBoundingClientRect();
        const mainsContainer = mainsRef.current?.getBoundingClientRect();
        if (scrollContainer !== null && saucesContainer && mainsContainer) {
            if (scrollContainer.offsetTop - saucesContainer.top < 0) {
                setCurrent('bun');
            } else if (scrollContainer.offsetTop - mainsContainer.top < 0) {
                setCurrent('sauce');
            } else {
                setCurrent('main');
            }
        }
    }
    return (
        <>
            {ingredientsRequest && !ingredientsError && ( <h1>Идет загрузка...</h1> )}
            {ingredientsError && !ingredientsRequest && ( <h1>Произошла ошибка попробуйте позже</h1> )}
            {!ingredientsError && !ingredientsRequest && ingredients.length > 0 && (
                <div className={style.construct}>
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
                    <div className="mt-10">
                        <div className={style.products} onScroll={handleScroll} ref={scrollRef}>
                            <h3 className="text text_type_main-medium" ref={bunsRef} id="bun">Булки</h3>
                            <div className={style.products__cont}>
                                {ingredients.filter((item: TBurgerIngredientProps) => item.type === 'bun').map((item: TBurgerIngredientProps) => <BurgerIngrediensDetail onOpen={handleOpenModal} {...item} key={item._id} />)}
                            </div>
                            <h3 className="text text_type_main-medium" ref={saucesRef} id="sauce">Соусы</h3>
                            <div className={style.products__cont}>
                                {ingredients.filter((item: TBurgerIngredientProps) => item.type === 'sauce').map((item: TBurgerIngredientProps) => <BurgerIngrediensDetail onOpen={handleOpenModal} {...item} key={item._id} />)}
                            </div>
                            <h3 className="text text_type_main-medium" ref={mainsRef} id="main">Начинки</h3>
                            <div className={style.products__cont}>
                                {ingredients.filter((item: TBurgerIngredientProps) => item.type === 'main').map((item: TBurgerIngredientProps) => <BurgerIngrediensDetail onOpen={handleOpenModal} {...item} key={item._id} />)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
          {/*  {modalActive && ingredientDetails && (
                <Modal onClose={handleCloseModal} title={'Детали ингредиента'}>
                    <IngredientDetails {...ingredientDetails} />
                </Modal>)
            }*/}
        </>
    );
}

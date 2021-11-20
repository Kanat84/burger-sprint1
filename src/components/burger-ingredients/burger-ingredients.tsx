import { createRef, useState, SyntheticEvent } from 'react';
import style from './burger-ingredients.module.css';
import appStyles from '../app/app.module.css';
import BurgerIngrediensDetail from "../burger-ingredients-detail/burger-ingredients-detail";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { TBurgerIngredientProps } from '../../utils/prop-types';
import { RootState, useSelector } from '../../services/types';

export default function BurgerIngredients() { 
    const [current, setCurrent] = useState<string>('bun');
    const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector((state:RootState)=> state.burgerIngredients) 
    const bunsRef = createRef<HTMLDivElement>();
    const saucesRef = createRef<HTMLDivElement>();
    const mainsRef  = createRef<HTMLDivElement>(); 
    const scrollRef = createRef<HTMLDivElement>();    

    function handleTabClick (value: string) { 
        setCurrent(value); 
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
            {ingredientsRequest && !ingredientsFailed && ( <h1>Идет загрузка...</h1> )}
            {ingredientsFailed && !ingredientsRequest && ( <h1>Произошла ошибка, попробуйте позже...</h1> )}
            {!ingredientsFailed && !ingredientsRequest && ingredients.length > 0 && (
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
                                {ingredients.filter((item: TBurgerIngredientProps) => item.type === 'bun').map((item: TBurgerIngredientProps) => <BurgerIngrediensDetail {...item} key={item._id} />)}
                            </div>
                            <h3 className="text text_type_main-medium" ref={saucesRef} id="sauce">Соусы</h3>
                            <div className={style.products__cont}>
                                {ingredients.filter((item: TBurgerIngredientProps) => item.type === 'sauce').map((item: TBurgerIngredientProps) => <BurgerIngrediensDetail {...item} key={item._id} />)}
                            </div>
                            <h3 className="text text_type_main-medium" ref={mainsRef} id="main">Начинки</h3>
                            <div className={style.products__cont}>
                                {ingredients.filter((item: TBurgerIngredientProps) => item.type === 'main').map((item: TBurgerIngredientProps) => <BurgerIngrediensDetail  {...item} key={item._id} />)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

import { useDrag }  from "react-dnd";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import style from './burger-ingredients-detail.module.css';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { TBurgerIngredientDetailProps, TBurgerIngredientProps } from '../../utils/prop-types';
import { RootState } from '../../services/types';

export default function BurgerIngredientDetail(props: TBurgerIngredientDetailProps) {
    const location = useLocation();
    const {ingredients, bun}: any = useSelector((state: RootState) => state.burgerConstructor);
    let ingredientsCount = ingredients.filter((item: TBurgerIngredientProps) => item._id === props._id).length;
    let counter;

    if (props.type === 'bun' && bun && bun._id === props._id) {
        counter = 2;
    } else if (props.type !== 'bun' && ingredientsCount) {
        counter = ingredientsCount
    } else {
        counter = '';
    }
    const [{opacity}, ref] = useDrag({
        type: 'ingredients',
        item: {...props},
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    })
    return (
        <Link to={{ pathname: `/ingredients/${props._id}`, state: {background: location} }}
            ref={ref} draggable className={style.product} style={{opacity: opacity}} onClick={props.onOpen} id={props._id}>
            {counter && <Counter count={counter} />}
            <img className={`${style.image} pr-4 pl-4`} src={props.image} alt=""/>
            <div className={`${style.price} mt-1 mb-1`}>
                <span className='text text_type_digits-default mr-2'>{props.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${style.name} text text_type_main-default mt-1 mb-10`}>{props.name}</p>
        </Link>
    )
}

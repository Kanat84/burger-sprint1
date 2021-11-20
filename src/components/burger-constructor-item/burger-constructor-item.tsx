import { useRef } from 'react';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import constructorStyle from "../burger-constructor/burger-constructor.module.css";
import { useDrag, useDrop } from "react-dnd";
import { TBurgerIngredientProps, TBurgerConstructorIngredientProps } from '../../utils/prop-types';
import { MoveIngredientInConstructorAction, RemoveIngredientFromConstructorAction } from '../../services/actions/burger-constructor';  
import { useDispatch } from '../../services/types';

export default function BurgerConstructorIngredient (props: TBurgerConstructorIngredientProps) {
    const dispatch = useDispatch();
    const handleRemoveIngredient = () => {
        dispatch(RemoveIngredientFromConstructorAction(props.uuid));
    }
    const ref = useRef<HTMLLIElement>(null);
    const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
        dispatch(MoveIngredientInConstructorAction(dragIndex, hoverIndex));
    }
    const [{ isDragging }, drag] = useDrag({
        type: 'sortable',
        item: () => {
            return { ...props };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;

    const [, drop] = useDrop({
        accept: 'sortable',
        hover(item: TBurgerIngredientProps, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = props.index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset: any = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveCardHandler(dragIndex, hoverIndex);
            item.index = hoverIndex
        },
    });
    drag(drop(ref))

    return (<li id={props._id} style={{opacity: opacity}} className={constructorStyle.item} ref={ref}>
        <div className="mr-2" style={{cursor: 'pointer'}}>
            <DragIcon type={"primary"} />
        </div>
        <ConstructorElement text={props.name} price={props.price} thumbnail={props.image} handleClose={handleRemoveIngredient} />
    </li>)
}
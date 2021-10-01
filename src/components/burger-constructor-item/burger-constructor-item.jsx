import React, { useRef } from 'react';
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import constructorStyle from "../burger-constructor/burger-constructor.module.css";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { MOVE_INGREDIENT_IN_CONSTRUCTOR, REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from "../../services/actions/burger-constructor";

export default function BurgerConstructorIngredient (props) {
    const index = props.index;
    const dispatch = useDispatch();
    const handleRemoveIngredient = () => {
        dispatch({
            type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
            id: props.uuid
        })
    }

    const ref = useRef(null);

    const moveCardHandler = (dragIndex, hoverIndex) => {
        dispatch({
            type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
            dragIndex,
            hoverIndex
        })
    }

    const [{ isDragging }, drag] = useDrag({
        type: 'sortable',
        item: () => {
            return { ...props, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;

    const [, drop] = useDrop({
        accept: 'sortable',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
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

    return (<li _id={props._id} style={{opacity: opacity}} className={constructorStyle.item} ref={ref}>
        <div className="mr-2" style={{cursor: 'pointer'}}>
            <DragIcon type={"primary"}/>
        </div>
        <ConstructorElement
            text={props.name}
            price={props.price}
            thumbnail={props.image}
            handleClose={handleRemoveIngredient}
        />
    </li>)
}

BurgerConstructorIngredient.propTypes = {
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
}

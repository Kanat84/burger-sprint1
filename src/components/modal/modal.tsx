import { useEffect, FunctionComponent, KeyboardEvent, ReactElement } from 'react';
import ReactDOM from "react-dom";
import style from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
//import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { TModalProps } from '../../utils/prop-types';

export default function Modal (props: TModalProps): ReactElement {  
//const Modal: FunctionComponent<TModalProps> = (props) => {   
    function handleCloseModal(e: KeyboardEvent) {   
        if (e.charCode === 27) {
            props.onClose();
        }
    }
    useEffect(() => {
        document.addEventListener('keyup', handleCloseModal);
        return () => {
            document.removeEventListener('keyup', handleCloseModal);
        } 
    })    
    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={props.onClose} />   
            <div className={`${style.modal} pt-10 pr-10 pl-10 pb-15`}>
                <div className={style.header}>
                    <h3 className={`${style.title} text text_type_main-large`}>{props.title}</h3>
                    <div className={style.close} onClick={props.onClose}>
                        <CloseIcon type={"primary"} />
                    </div> 
                </div>
                <div>{props.children}</div>
            </div>
        </>,
        document.getElementById('modal-root')!
    )
};
/*
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.element.isRequired
}*/
//export default Modal;
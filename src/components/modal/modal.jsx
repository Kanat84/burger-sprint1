import React, { useEffect } from 'react';
import ReactDOM from "react-dom";
import modalStyle from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";

export default function Modal (props) {  
    function handleCloseModal (e) {
        if (e.keyCode === 27) {
            props.onClose(e);
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
            <div className={`${modalStyle.modal} pt-10 pr-10 pl-10 pb-15`}>
                <div className={modalStyle.header}>
                    <h3 className={`${modalStyle.title} text text_type_main-large`}>{props.title}</h3>
                    <div className={modalStyle.close} onClick={props.onClose}>
                        <CloseIcon type={"primary"} />
                    </div> 
                </div>
                <div>{props.children}</div>
            </div>
        </>,
        document.getElementById('modal-root')
    )
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.element.isRequired
}

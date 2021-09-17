import React from 'react';
import ReactDOM from "react-dom";
import modalStyle from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import dataPropTypes from "../../utils/prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";


export default function Modal (props) {  

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={props.onClose} />   
            <div className={`${modalStyle.modal} pt-10 pr-10 pl-10 pb-15`}>
                <div className={modalStyle.header}>
                    <h2 className={`${modalStyle.title} text text_type_main-large`}>{props.title}</h2>
                    <div className={modalStyle.close} onClick={props.onClose}>
                        <CloseIcon type={"primary"} />
                    </div> 
                </div>
                <div>{props.children}</div>
            </div>
        </>,
        document.getElementById('modal-root')
    )
}

Modal.propTypes = { ingredients: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired }

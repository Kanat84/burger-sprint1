import { useEffect } from 'react';
import ReactDOM from "react-dom";
import { useHistory } from 'react-router-dom';
import style from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { TModalProps } from '../../utils/prop-types';

export default function Modal (props: TModalProps) {  
    const history = useHistory();
    function closeModal () {
        history.goBack();
    }    
    function handleCloseModal(e: KeyboardEvent) {     
        if (e.keyCode === 27) {
            closeModal();
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
            <ModalOverlay onClose={closeModal} />   
            <div className={`${style.modal} pt-10 pr-10 pl-10 pb-15`}>
                <div className={style.header}>
                    <h3 className={`${style.title} text text_type_main-large`}>{props.title}</h3>
                    <div className={style.close} onClick={closeModal} id="closeModal">
                        <CloseIcon type={"primary"} />
                    </div> 
                </div>
                <div>{props.children}</div>
            </div>
        </>,
        document.getElementById('modal-root')!
    )
};
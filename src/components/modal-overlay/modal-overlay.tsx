import { FunctionComponent } from 'react';
import style from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import { TModalOverlayProps } from '../../utils/prop-types';

export default function ModalOverlay (props: TModalOverlayProps) {
//const ModalOverlay: FunctionComponent<TModalOverlayProps> = (props) => {  

  return (
    <section className={`${style.overlay}`} onClick={props.onClose} >
      { props.children }
    </section >
  )
}
/*
ModalOverlay.propsTypes = { 
  onClose: PropTypes.func.isRequired, 
  children: PropTypes.element.isRequired 
}*/
//export default ModalOverlay;
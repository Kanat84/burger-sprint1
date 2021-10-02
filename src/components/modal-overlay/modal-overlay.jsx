//import React from 'react';
import modalOverlayStyle from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay (props) {
  return (
    <section className={`${modalOverlayStyle.overlay} `} onClick={props.onClose} >
      {props.children}
    </section >
  )
}

ModalOverlay.propsTypes = { onClose: PropTypes.func.isRequired }
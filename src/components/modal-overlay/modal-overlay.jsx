//import React from 'react';
import style from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export default function ModalOverlay (props) {
  return (
    <section className={`${style.overlay} `} onClick={props.onClose} >
      {props.children}
    </section >
  )
}

ModalOverlay.propsTypes = { onClose: PropTypes.func.isRequired }
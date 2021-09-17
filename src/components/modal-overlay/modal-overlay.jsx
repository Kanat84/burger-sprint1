import React from 'react';
import modalOverlayStyle from './modal-overlay.module.css';
import PropTypes from 'prop-types';
import dataPropTypes from "../../utils/prop-types";

export default function ModalOverlay (props) {
  return (
    <section className={`${modalOverlayStyle.overlay} `} onClick={props.onClose} >
      {props.children}
    </section >
  )
}

ModalOverlay.propTypes = { ingredients: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired }


import style from './modal-overlay.module.css';
import { TModalOverlayProps } from '../../utils/prop-types';

export default function ModalOverlay (props: TModalOverlayProps) {
  return (
    <section className={`${style.overlay}`} onClick={props.onClose} >
      { props.children }
    </section >
  )
}
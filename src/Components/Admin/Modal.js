import style from './Modal.module.css';
import { Fragment } from 'react';
import ReactDom from 'react-dom';

const Backdrop = (props) => {
	return <div onClick={props.onClose} className={style.backdrop}></div>
};
const ModalOverlay = (props) => {
	return (<div className={style.modal}>
		<div className={style.content}>{props.children}
		</div></div>);
};
const portalElment = document.getElementById('overlays');
const Modal = (props) => {
	return (<Fragment>
		{ReactDom.createPortal(<Backdrop onClose={props.onClose} />, portalElment)}
		{ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElment) }
	</Fragment>);
}
export default Modal;
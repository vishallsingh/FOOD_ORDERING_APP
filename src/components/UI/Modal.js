import classes from './Modal.module.css';
import ReactDOM from 'react-dom';
import { Fragment } from 'react';

function Backdrop(props){
    return(
    <div className={classes.backdrop} onClick={props.onClose} ></div>
    );
}
function ModalOverlay(props){
    return(
        <div className={classes.modal}><div className={classes.content}>{props.children}</div></div>
    );
}

function Modal(props){
    return(
        <Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />,document.getElementById('overlays'))}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,document.getElementById('overlays'))}
        </Fragment>
    );
}
export default Modal;
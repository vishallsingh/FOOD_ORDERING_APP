import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import CheckCart from './CheckCart';
import { Fragment } from 'react';

function Cart(props) {

    const [hasOrdered,setHasOrdered]= useState(false);
    const [isSubmitting,setIsSubmitting]= useState(false);
    const [didSubmit,setDidSubmit]= useState(false);

    const cartCtx = useContext(CartContext);
    const totalAmount = `Rs ${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    function cartItemAddHandler(item){
        cartCtx.addItem({...item,amount:1});
    }
    function cartItemRemoveHandler(id){
        cartCtx.removeItem(id);
    }

    const cartItems = <ul className={classes['cart-items']}>{
        cartCtx.items.map(item =>
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onAdd={cartItemAddHandler.bind(null, item)}
                onRemove={cartItemRemoveHandler.bind(null,item.id)}
            />
        )}
    </ul>;
    function confirmOrderHandler(){
        setHasOrdered(true);
    }
    function onsubmitHandler(userData){
        setIsSubmitting(true);
        fetch('https://react-http-movie-5bf52-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                orderedItems:cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }
    const beforeSubmitModal = <Fragment>
        {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {hasOrdered && <CheckCart onConfirm={onsubmitHandler} onCancel={props.onClose} />}
            {!hasOrdered && <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose} >Close</button>
                {hasItems && <button className={classes.button} onClick={confirmOrderHandler}>Order</button>}
            </div>}
    </Fragment>;

    const duringSubmit = <p>Submitting Order...</p>;

    const afterSubmit =<Fragment >
        <p>Successfully Sent the order.</p>
        <div className={classes.actions}>
            <button className={classes.button} onClick={props.onClose} >Close</button>
        </div>
    </Fragment>;

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting&&!didSubmit&&beforeSubmitModal}
            {isSubmitting&&duringSubmit}
            {!isSubmitting&&didSubmit&&afterSubmit}
        </Modal>
    );
}
export default Cart;
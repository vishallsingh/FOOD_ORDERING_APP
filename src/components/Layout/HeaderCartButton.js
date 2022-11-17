import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';


function HeaderCartButton(props) {
    const [btnHighlight,setBtnHighlight]=useState(false);
    const cartCtx=useContext(CartContext);
    const numberOfItems=cartCtx.items.reduce((currNum,item) => {
        return currNum + item.amount;
    }, 0);

    const {items}=cartCtx;

    const btnClasses = `${classes.button} ${btnHighlight ? classes.bump : ''}`;
    useEffect(()=>{
        if(items.length===0){
            return;
        }
        setBtnHighlight(true);
        const timer=setTimeout(()=>{
            setBtnHighlight(false);
        },300);
        return ()=>{
            clearTimeout(timer);
        };
    },[items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>My Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    );
};
export default HeaderCartButton;
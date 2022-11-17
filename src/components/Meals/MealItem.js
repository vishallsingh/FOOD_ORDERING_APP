import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

function MealItem(props){

    const cartCtx=useContext(CartContext);

    const price=`Rs ${props.price.toFixed(2)}`;

    function onAddToCartHandler(amount){
        //console.log(props.id);
        cartCtx.addItem({
            id:props.id,
            name:props.name,
            amount:amount,
            price :props.price
        });
    };
    // console.log(props.id);
    return(
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm id={props.id} onAddToCart={onAddToCartHandler} />
            </div>
        </li>
    );
}
export default MealItem;
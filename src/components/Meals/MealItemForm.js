import { useRef,useState } from 'react';
import Input from '../UI/Input';
import classes from './MealItemForm.module.css';

function MealItemForm(props) {
    const amountInputRef= useRef();
    const [isValid,setIsValid]=useState(true);

    function submitHandler(event){
        event.preventDefault();
        const enteredAmount=amountInputRef.current.value;
        const enteredAmountNumber= +enteredAmount;
        if(enteredAmount.trim().length===0 ||enteredAmountNumber<1||enteredAmountNumber>5){
            setIsValid(false);
            return;
        }
        if(isValid===false){
            setIsValid(true);
        }
        props.onAddToCart(enteredAmountNumber);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label='Amount'
                input={{
                    id: 'amount_'+props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step:'1',
                    defaultValue: '1'
                }}
            />
            <button type='submit'>+ Add</button>
            {!isValid&&<p>Please enter a valid amount(1-5)</p>}
        </form>
    );
}
export default MealItemForm;
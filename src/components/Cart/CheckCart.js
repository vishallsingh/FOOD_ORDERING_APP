import { useRef, useState } from 'react';
import classes from './CheckCart.module.css';

const isEmpty = (value) => value.trim() ==='';
const isFiveDig = (value) => value.trim().length === 6;

const CheckCart = (props) => {
    const [isValid,setIsValid]= useState({ 
        name:true,
        street:true,
        postal:true,
        city:true
    });

    const nameRef=useRef();
    const streetRef=useRef();
    const postalRef=useRef();
    const cityRef=useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName=nameRef.current.value;
    const enteredStreet=streetRef.current.value;
    const enteredPostal=postalRef.current.value;
    const enteredCity=cityRef.current.value;

    const nameIsValid= !isEmpty(enteredName);
    const streetIsValid= !isEmpty(enteredStreet);
    const postalIsValid= isFiveDig(enteredPostal);
    const cityIsValid= !isEmpty(enteredCity);

    setIsValid({name:nameIsValid,street:streetIsValid,postal:postalIsValid,city:cityIsValid});

    const formIsValid=nameIsValid&&streetIsValid&&postalIsValid&&cityIsValid;
    if(!formIsValid){
        return;
    }
    //submit
    props.onConfirm({
        name:enteredName,
        street:enteredStreet,
        postal:enteredPostal,
        city:enteredCity
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${isValid.name ? '' :classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef} />
        {!isValid.name && <p>Please enter a valid name.</p> }
      </div>
      <div className={`${classes.control} ${isValid.street ? '' :classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef} />
        {!isValid.street && <p>Please enter a valid street name.</p> }
      </div>
      <div className={`${classes.control} ${isValid.postal ? '' :classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalRef} />
        {!isValid.postal && <p>Please enter a valid 6 digit postal code.</p> }
      </div>
      <div className={`${classes.control} ${isValid.city ? '' :classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef} />
        {!isValid.city && <p>Please enter a valid city name.</p> }
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckCart;
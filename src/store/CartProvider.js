import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState={
    items:[],
    totalAmount:0
}
function cartReducer(state,action) {
    if(action.type ==='ADD'){
        const updatedTotalAmount=state.totalAmount+ action.item.price * action.item.amount;
        const existingItemIndex=state.items.findIndex(item => item.id === action.item.id);
        const existingItem=state.items[existingItemIndex];
        let updatedItems;
        if(existingItem){
            let updatedItem;
            updatedItem={
                ...existingItem,
                amount:existingItem.amount + action.item.amount
            };
            updatedItems=[...state.items];
            updatedItems[existingItemIndex]=updatedItem;
        }
        else{
            updatedItems = state.items.concat(action.item);
        }
        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    if(action.type === 'REMOVE'){
        const existingItemIndex=state.items.findIndex(item => item.id === action.id);
        const existingItem=state.items[existingItemIndex];
        const updatedTotalAmount=state.totalAmount-existingItem.price;
        let updatedItems;
        if(existingItem.amount === 1){
            updatedItems=state.items.filter(item => item.id !==action.id);
        }else{
            let updatedItem;
            updatedItem={
                ...existingItem,
                amount:existingItem.amount-1
            };
            updatedItems=[...state.items];
            updatedItems[existingItemIndex]=updatedItem;
        }
        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    if(action.type ==='CLEAR'){
        return defaultCartState;
    }

    return defaultCartState;
}

function CartProvider(props){
    const [cartState,dispatchCartAction]=useReducer(cartReducer,defaultCartState);

    function addCartItemHandler(item){
        dispatchCartAction({type:'ADD',item:item});
    };
    function removeCartItemHandler(id){
        dispatchCartAction({type:'REMOVE', id:id});
    };
    function clearCartHandler(id){
        dispatchCartAction({type:'CLEAR'});
    };

    const cartContext={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addCartItemHandler,
        removeItem:removeCartItemHandler,
        clearCart:clearCartHandler
    }

    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
}
export default CartProvider;
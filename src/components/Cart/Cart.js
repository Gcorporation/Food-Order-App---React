import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import React, { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckOut, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    console.log("cartCtx.items --->",cartCtx.items);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemAddhandler = (item) => {
        cartCtx.addItem(item);
    }

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderhandler = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://food-order-2ac1c-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const cartItems = <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (
            <CartItem key={item.id} 
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddhandler.bind(null, item)} 
            />
        ))}
    </ul>

    const modalAction = <div className={classes.actions}>
    <button className={classes['button-alt']} onClick={props.onClose}>Close</button>
    {hasItems && <button className={classes['button']} onClick={orderHandler}>Order</button>}
    </div>

    const cartModalContent = <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckOut && <Checkout onConfirm={submitOrderhandler} onCancel={props.onClose} />}
        {!isCheckOut && modalAction}
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = <p>Successfully sent the order!</p>

return (
    <Modal onClose={props.onClose}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {didSubmit && didSubmit && didSubmitModalContent}
    </Modal>
    
)

};

export default Cart;
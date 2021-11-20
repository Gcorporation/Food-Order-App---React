import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckOut, setIsCheckout] = useState(false);
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

    const submitOrderhandler = (userData) => {
        fetch('https://food-order-2ac1c-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderItems: cartCtx.items
            })
        });
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

return (
    <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckOut && <Checkout onConfirm={submitOrderhandler} onCancel={props.onClose} />}
        {!isCheckOut && modalAction}
    </Modal>
    
)

};

export default Cart;
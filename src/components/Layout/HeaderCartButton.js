import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css'; 
import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {

const cartCtx = useContext(CartContext);
const { items } = cartCtx;

console.log("cartCtx.items --->",cartCtx.items);

const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
}, 0);



useEffect(() => {
    if(cartCtx.items.length === 0) {
        return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
        setBtnIsHighlighted(false);
    },300);

    return () => {
        clearTimeout(timer);
    }

},[items]);

    return <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}><CartIcon /></span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}

export default HeaderCartButton;
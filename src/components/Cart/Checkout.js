import classes from './Checkout.module.css';

const Checkout = props => {

    const confirmHandler = (event) => {
        event.preventDefault();
    }

    return <form onSubmit={confirmHandler}>
        <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id='name'></input>
        </div>
        <div className={classes.control}>
            <label htmlFor="name">Street</label>
            <input type="text" id='street'></input>
        </div>
        <div className={classes.control}>
            <label htmlFor="name">Postal Code</label>
            <input type="text" id='postal'></input>
        </div>
        <div className={classes.control}>
            <label htmlFor="name">City</label>
            <input type="text" id='city'></input>
        </div>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button>Confirm</button>
    </form>
} 

export default Checkout;
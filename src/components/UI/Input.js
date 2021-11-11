import classes from './Input.module.css';
import React from 'react';

const Input = React.forwardRef((props, ref) => {

    console.log("props on Input",props);
    return <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} {...props.input} type="text" />
    </div>
});

export default Input;
import React from 'react';
import style from "./M1Button.module.css"
import {useStyles} from "../../../hooks/useStyles";
function M1Button({children, className, ...props} ) {
    
    const allStyles = useStyles(style.MButton, className)
    
    return (
        <button {...props} className={allStyles}>
            {children}
        </button>
    );
}

export default M1Button;
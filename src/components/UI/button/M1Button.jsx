import React from 'react';
import style from "./M1Button.module.css"
function M1Button({children, className, ...props} ) {
    
    const allStyles = [style.MButton]

    if (className) {
        allStyles.push(className)
    }
    
    return (
        <button {...props} className={allStyles.join(" ")}>
            {children}
        </button>
    );
}

export default M1Button;
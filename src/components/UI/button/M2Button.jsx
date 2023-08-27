import React from 'react';
import style from "./M2Button.module.css"

function M2Button({children, color, ...props}) {

    let classes = [style.button]

    const colors = {
        green: style.green,
        red: style.red
    }

    classes += ' ' + (colors[color] ?? colors.blue)


    return (
        <button {...props} className={classes}>
            {children}
        </button>
    );
}

export default M2Button;
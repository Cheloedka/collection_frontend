import React from 'react';
import style from './MInput.module.css'

function MInput({children,  placeholder, ...props}) {

    return (
        <div className="form-floating">
            <input
                { ...props}
                className={style.MInput + " form-control"}
            />
            <label>
                {placeholder}
            </label>
            <p className={style.text}>
                {children}
            </p>
        </div>
    );
}

export default MInput;
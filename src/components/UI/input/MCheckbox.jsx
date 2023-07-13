import React from 'react';
import style from './MCheckbox.module.css'

function MCheckbox({span, ...props}) {
    return (
        <label className={style.label}>
            <input type="checkbox" {...props}/>
            <span>{span}</span>
        </label>
    );
}

export default MCheckbox;
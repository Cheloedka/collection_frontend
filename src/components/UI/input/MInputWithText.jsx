import React from 'react';
import style from "./MInputWithText.module.css"

function MInputWithText({placeholder, ...props}) {
    return (
        <div className={style.divInput}>
            <label className={style.label}>{placeholder}</label>
            <input { ...props} className={style.MInput + " form-control"} />
        </div>
    );
}

export default MInputWithText;
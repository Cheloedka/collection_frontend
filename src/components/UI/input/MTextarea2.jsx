import React from 'react';
import style from "./MTextarea.module.css";

function MTextarea2({placeholder, ...props}) {
    return (
        <textarea
            { ...props}
            placeholder={placeholder}
            className={style.MTextarea2 + " form-control"}
        >
        </textarea>
    );
}

export default MTextarea2;
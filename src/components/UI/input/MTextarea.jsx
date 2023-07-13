import React from 'react';
import style from "./MTextarea.module.css";

function MTextarea({placeholder, ...props}) {
    return (
        <div className="form-floating">
            <textarea { ...props}  className={style.MTexarea + " form-control"}> </textarea>
            <label>{placeholder}</label>
        </div>
    );
}

export default MTextarea;
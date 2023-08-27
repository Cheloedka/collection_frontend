import React from 'react';
import style from "./MTextarea.module.css";

function MTextarea({placeholder, ...props}) {
    return (
        <div className="form-floating">
            <textarea
                { ...props}
                className={style.MTextarea + " form-control"}>

            </textarea>
            <label>
                {placeholder}
            </label>
        </div>
    );
}

export default MTextarea;
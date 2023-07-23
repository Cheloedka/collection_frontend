import React from 'react';
import style from "./MInputwithText.module.css";

function MInputWihtText({placeholder, ...props}) {
    return (
        <div>
            <input { ...props}  className={style.MInput + " form-control"} />
            <label>{placeholder}</label>
        </div>
    );
}

export default MInputWihtText;
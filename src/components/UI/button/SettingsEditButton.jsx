import React from 'react';
import style from "./SettingsEditButton.module.css";

function SettingsEditButton({children, text ,...props}) {
    return (
        <div {...props} className={style.borderedButton}>
            {children}
            <div className={style.text}>
                {text}
            </div>
        </div>
    );
}

export default SettingsEditButton;
import React from 'react';
import style from "./SettingsEditButton.module.css";
import Edit from "../svg/Edit";

function SettingsEditButton({children ,...props}) {
    return (
        <div {...props} className={style.borderedButton}>
            <Edit color='#3A325B'/>
            <div className={style.text}>
                {children}
            </div>
        </div>
    );
}

export default SettingsEditButton;
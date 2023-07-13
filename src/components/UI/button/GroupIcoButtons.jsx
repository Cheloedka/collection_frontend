import React from 'react';
import style from "./GroupIcoButtons.module.css";
import IcoButton from "./IcoButton";

function GroupIcoButtons({firstIco, secondIco}) {
    return (
        <div className={style.groupIcons}>
            <IcoButton to={'/settings'}>{firstIco}</IcoButton>
            <IcoButton>{secondIco}</IcoButton>
        </div>    );
}

export default GroupIcoButtons;
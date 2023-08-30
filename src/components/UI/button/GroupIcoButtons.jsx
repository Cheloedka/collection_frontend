import React from 'react';
import style from "./GroupIcoButtons.module.css";
import IcoButton from "./IcoButton";

function GroupIcoButtons({firstIco, secondIco, firstIcoTo, secondIcoTo}) {
    return (
        <div className={style.groupIcons}>
            {firstIco ?
                <IcoButton to={firstIcoTo}>
                    {firstIco}
                </IcoButton>
                :<></>
            }
            {secondIco ?
                <IcoButton to={secondIcoTo}>
                    {secondIco}
                </IcoButton>
                :<></>
            }

        </div>
    );
}

export default GroupIcoButtons;
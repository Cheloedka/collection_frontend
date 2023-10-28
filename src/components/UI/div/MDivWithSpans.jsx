import React from 'react';
import MDiv from "./MDiv";
import style from "./MDivWithAllSpans.module.css";

function MDivWithSpans({mainText, secondText, childrenCloseToText, children, ...props}) {
    return (
        <MDiv {...props}>
            <div className={style.divFlex}>
                <div>
                    <span className={style.spanMain}>
                        {mainText}
                    </span>
                    <span className={style.spanSecond}>
                        {secondText}
                    </span>
                </div>
                {childrenCloseToText}
            </div>
            {children}
        </MDiv>
    );
}

export default MDivWithSpans;
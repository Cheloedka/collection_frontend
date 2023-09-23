import React from 'react';
import MDiv from "../../../../components/UI/div/MDiv";
import style from "./RightInfo.module.css";
import ellipsis from '../../../../styles/Ellipsis.module.css'

function RightInfo({image, text1, text2, ...props}) {
    return (
        <MDiv className={style.mainDiv} {...props}>
            <img
                className={style.divRightInfoImg}
                src={image}
            />

            <div className={style.divRightInfoDivSpan}>

                <span className={style.divRightInfoMainSpan}>
                    {text1}
                </span>
                <div className={ellipsis.main}>
                    <span className={style.divRightInfoSecondSpan + " " + ellipsis.childrenClamp2}>
                        {text2}
                    </span>
                </div>

            </div>
        </MDiv>
    );
}

export default RightInfo;
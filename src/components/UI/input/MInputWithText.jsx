import style from "./MInputWithText.module.css"
import Edit from "../svg/Edit";
import {useEffect, useState} from "react";

function MInputWithText({placeholder, defaultValue, children, isInputsClosed, onClose, ...props}) {

    const [visible, setVisible] = useState(false)

    function setVisibility() {
        setVisible(!visible)
    }

    useEffect(() => {
        if (isInputsClosed)
            setVisible(false)
    }, [isInputsClosed])

    return (
        <div className={style.divInput}>
            <label className={style.label}>{placeholder}</label>
            <div className={visible === false ? style.divLabel : style.unVisible}>
                <div className={style.defaultValue}>{defaultValue}</div>
                <div className={style.setVisibility} onClick={setVisibility}>
                    <Edit color='#3A325B'/>
                </div>
            </div>
            <div className={visible === true ? style.visible : style.unVisible}>
                <div className={style.divLabel}>
                    <input
                        className={style.MInput + " form-control"}
                        {...props}
                    />
                    <div className={style.setVisibility} onClick={() => {
                        setVisibility()
                        onClose()
                    }}>
                        X
                    </div>
                </div>
                {children}
            </div>

        </div>
    );
}

export default MInputWithText;
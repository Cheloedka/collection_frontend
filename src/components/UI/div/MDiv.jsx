import React from 'react';
import style from "./MDiv.module.css";
import {useStyles} from "../../../hooks/useStyles";

function MDiv({className, children, ...props}) {

    const allStyles = useStyles(style.MDiv, className)

    return (
        <div className={allStyles} {...props}>
            {children}
        </div>
    );
}

export default MDiv;
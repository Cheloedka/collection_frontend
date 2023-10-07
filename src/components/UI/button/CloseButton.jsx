import React from 'react';
import {useStyles} from "../../../hooks/useStyles";
import style from "./CloseButton.module.css"

function CloseButton({className, ...props}) {

    const classes = useStyles(style.main, className)

    return (
        <div
            className={classes}
            {...props}
        >
            Χ
        </div>
    );
}

export default CloseButton;
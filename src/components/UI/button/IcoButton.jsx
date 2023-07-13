import React from 'react';
import style from "./IcoButton.module.css";
import {Link} from "react-router-dom";

function IcoButton({to, children, ...props}) {

    return (
        <Link to={to} className={style.IcoDiv} {...props}>
            {children}
        </Link>
    );
}

export default IcoButton;
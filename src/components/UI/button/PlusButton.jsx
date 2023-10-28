import React from 'react';
import style from "./PlusButton.module.css"
import {Link} from "react-router-dom";
import useIsCurrentUser from "../../../hooks/useIsCurrentUser";
import {useStyles} from "../../../hooks/useStyles";

function PlusButton({to, className, ...props}) {
    const isUser = useIsCurrentUser()

    const allStyles = useStyles(style.main, className)



    return (
        <>
            { to ?
                <>
                    { isUser ?
                        <Link
                            to={to}
                            className={allStyles}
                        >
                            +
                        </Link>
                        :<></>
                    }
                </>
                :
                <div className={allStyles} {...props} >
                    +
                </div>
        }
        </>
    );
}

export default PlusButton;
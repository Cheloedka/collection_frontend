import React from 'react';
import style from "./PlusButton.module.css"
import {Link} from "react-router-dom";
import useIsCurrentUser from "../../../hooks/useIsCurrentUser";
import {useStyles} from "../../../hooks/useStyles";
import Tooltip from "../tooltip/Tooltip";

function PlusButton({to, className, ...props}) {
    const isUser = useIsCurrentUser()

    const allStyles = useStyles(style.main, className)



    return (
        <Tooltip direction={"bottom"} text={"Create new"} className={className}>
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
        </Tooltip>
    );
}

export default PlusButton;
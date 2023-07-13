import React from 'react';
import style from "./MDiv.module.css";

function MDiv({className, children, ...props}) {

    const allStyles = [style.MDiv]

    if (className) {
        allStyles.push(className)
    }

    return (
        <div className={allStyles.join(" ")} {...props}>
            {children}
        </div>
    );
}

export default MDiv;
import React from 'react';
import style from './Tag.module.css'

function Tag({children, color}) {

    const classes = [style.tag]
    const colors = {
        red: style.redTag,
        green: style.greenTag,
        violet: style.violetTag,
        yellow: style.yellowTag
    }

    classes.push(colors[color] ?? colors.red)



    return (
        <div className={classes.join(" ")}>
            {children}
        </div>
    );
}

export default Tag;
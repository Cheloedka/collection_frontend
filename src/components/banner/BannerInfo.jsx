import React from 'react';
import style from "./Banner.module.css";


function BannerInfo({tittle, secondText, themes, ...props}) {

    const classes = [style.divTittle]
    const secondClasses = [style.divSecondText]

    const mainThemes = {
        dark: style.divTittleDark,
        light: style.divTittleLight
    }

     const secondThemes = {
        dark: style.divSecondTextDark,
        light: style.divSecondTextLight
     }

    classes.push(mainThemes[themes] ?? mainThemes.light)
    secondClasses.push(secondThemes[themes] ?? secondThemes.light)

    return (
        <div {...props} className={style.divInfo}>
            <div className={classes.join(" ")}>
                {tittle}
            </div>
            <div className={secondClasses.join(" ")}>
                {secondText}
            </div>
        </div>
    );
}

export default BannerInfo;
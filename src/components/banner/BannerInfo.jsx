import style from "./Banner.module.css";
import {useStyles} from "../../hooks/useStyles";

function BannerInfo({tittle, secondText, themes, ...props}) {

    const mainThemes = {
        dark: style.divTittleDark,
        light: style.divTittleLight
    }

     const secondThemes = {
        dark: style.divSecondTextDark,
        light: style.divSecondTextLight
     }

    const classes = useStyles(style.divTittle, mainThemes[themes] ?? mainThemes.light)
    const secondClasses = useStyles(style.divSecondText, secondThemes[themes] ?? secondThemes.light)

    return (
        <div
            {...props}
            className={style.divInfo}
        >
            <div className={classes}>
                {tittle}
            </div>
            <div className={secondClasses}>
                {secondText}
            </div>
        </div>
    );
}

export default BannerInfo;
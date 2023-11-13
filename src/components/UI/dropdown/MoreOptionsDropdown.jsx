import {useStyles} from "../../../hooks/useStyles";
import style from "./MoreOptionsDropdown.module.css"


function MoreOptionsButton({options, className}) {

    const classes = useStyles(style.main, className)

    return (
        <div className={style.mainDiv}>
            <div className={classes}>
                <span className={style.dots}>···</span>
                <div className={style.options}>
                    {
                        options.map((o, index) =>
                            <div
                                className={style.option}
                                onClick={o.onClick}
                                key={index}
                            >
                                {o.title}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default MoreOptionsButton;
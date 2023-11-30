import style from "./Tooltip.module.css"
import {useStyles} from "../../../hooks/useStyles";

function Tooltip({children, text, direction, className}) {

    const types = {
        top: style.tooltipTop,
        bottom: style.tooltipBottom
    }

    const textStyle = useStyles(style.tooltip, types[direction] ?? types.top)

    return (
        <div className={style.main}>
            <span className={textStyle + " " + className}>
                {text}
            </span>
            {children}
        </div>
    );
}

export default Tooltip;
import MDiv from "./MDiv";
import style from "./MDivWithAllSpans.module.css";
import {Link} from "react-router-dom";

function MDivWithLinkSpans({to, mainText, secondText, childrenCloseToText, children, ...props}) {
    return (
        <MDiv {...props}>
            <div className={style.divFlex}>
                <Link to={to}>
                    <div>
                        <span className={style.spanMain}>
                            {mainText}
                        </span>
                        <span className={style.spanSecond}>
                            {secondText}
                        </span>
                    </div>
                </Link>
                {childrenCloseToText}
            </div>
            {children}
        </MDiv>
    );
}

export default MDivWithLinkSpans;
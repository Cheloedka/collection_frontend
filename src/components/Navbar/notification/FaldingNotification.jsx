import {useInterval} from "usehooks-ts";
import {useState} from "react";
import style from "./Notification.module.css";
import {getNotificationContent} from "./getNotificationContent";
import CloseButton from "../../UI/button/CloseButton";
import MDiv from "../../UI/div/MDiv";


function FadingNotification({notification, isShow, setIsShow}) {

    const [transparent, setTransparent] = useState(1)

    useInterval(() => {
        if (transparent > 0.5) {
            setTransparent(transparent - 0.04)
        }
        else {
            setIsShow(false)
            setTransparent(1)
        }

    }, isShow ? 1000 : null)

    return (
        <MDiv style={{opacity: transparent, zIndex: "300"}} className={style.fadingNotification}>
            <CloseButton className={style.closeBtn} onClick={() => setIsShow(false)} />
            {getNotificationContent(notification)}
        </MDiv>
    );
}

export default FadingNotification;
import React, {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../../context";
import Tooltip from "../../UI/tooltip/Tooltip";
import Bell from "../../../images/icons/Notification.svg";
import style from "../NavigationBar.module.css";
import {useConnectNotification} from "./useConnectNotification";



function Notification() {

    /*const [notifications, setNotifications] = useState([])

    const lastNotification = useConnectNotification(setNotifications)*/
    /*const [isShowNotification, setIsShowNotification] = useState(false)

    const buttonRef = useRef(null);
    const [isNotificationsWindowOpen, setNotificationsWindowOpen] = useState(false)

    useEffect(() => {
        if (lastNotification)
            setIsShowNotification(true)
    }, [lastNotification])*/

    return (
        <div>

            {/*<Tooltip
                direction={"bottom"}
                text={"Notification"}
            >
                <div className={style.divNotifications}>
                    <img src={Bell} className={style.icon} alt={"icon"}/>
                    {countNotifications > 0 ?
                        <div className={style.countNotifications}>
                            {countNotifications}
                        </div>
                        : <></>

                    }
                </div>
            </Tooltip>*/}

            {/*<button
                className={navbarStyle.notificationButton}
                onClick={() => setNotificationsWindowOpen(prev => !prev)}
                ref={buttonRef}
            >
                <NotificationBoxSvg />

                { notificationsCount > 0 ?
                    <div className={style.notificationCount}>
                        { notificationsCount < 100 ? notificationsCount : "99+" }
                    </div>
                    : <></> }
            </button>

            <NotificationWindow
                isNotificationsWindowOpen={isNotificationsWindowOpen}
                setNotificationsWindowOpen={setNotificationsWindowOpen}
                buttonRef={buttonRef}
                lastNotifications={notifications}
                setLastNotifications={setNotifications}
            />

            { isShowNotification ?
                <FadingNotification
                    isShow={isShowNotification}
                    setIsShow={setIsShowNotification}
                    notification={lastNotification}
                />
                : <></> }*/}
        </div>
    );
}

export default Notification;
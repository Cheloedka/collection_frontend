import React, {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../../context";
import Tooltip from "../../UI/tooltip/Tooltip";
import Bell from "../../../images/icons/Notification.svg";
import style from "./Notification.module.css";
import style2 from "../NavigationBar.module.css";
import {useConnectNotification} from "./useConnectNotification";
import FadingNotification from "./FaldingNotification";
import NotificationWindow from "./NotificationWindow";
import notificationWindow from "./NotificationWindow";



function Notification() {

    const {countNotifications, setCountNotifications} = useContext(UserContext)

    const [notifications, setNotifications] = useState({})

    const lastNotification = useConnectNotification(setNotifications)
    const [isShowNotification, setIsShowNotification] = useState(false)

    const buttonRef = useRef(null);
    const [isNotificationsWindowOpen, setNotificationsWindowOpen] = useState(false)

    useEffect(() => {
        if (lastNotification)
            setIsShowNotification(true)
    }, [lastNotification])

    useEffect( () => {
        if (isNotificationsWindowOpen) {
            setCountNotifications(prev => {
                if (prev <= 4) {
                    return 0
                }
                return prev - 4
            })
        }
    }, [isNotificationsWindowOpen])

    return (
        <div>
            <div
                className={style.divNotifications}
                onClick={() => setNotificationsWindowOpen(prev => !prev)}
                ref={buttonRef}
            >
                <img src={Bell} className={style2.icon} alt={"icon"}/>
                {countNotifications > 0 ?
                    <div className={style.countNotifications}>
                        <>{countNotifications < 100 ? countNotifications : "99+"}</>
                    </div>
                    : <></>

                }
            </div>

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
                : <></>
            }
        </div>
    );
}

export default Notification;
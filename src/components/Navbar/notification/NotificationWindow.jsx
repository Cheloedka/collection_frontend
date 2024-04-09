import {useContext, useEffect, useRef, useState} from "react";
import {UserContext} from "../../../context";
import UserService from "../../../API/UserService";
import {useFetching} from "../../../hooks/useFetching";
import style from "./Notification.module.css"
import MainMessage from "../../UI/message/MainMessage";
import MainLoader from "../../UI/loader/MainLoader";
import NotificationItem from "./NotificationItem";
import NotificationsListModal from "./NotificationListModal";

function NotificationWindow({isNotificationsWindowOpen, setNotificationsWindowOpen, buttonRef,
                                lastNotifications, setLastNotifications
                            }) {

    const {setCountNotifications, countNotifications} = useContext(UserContext)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [hasLoaded, setHasLoaded] = useState(false)

    const [fetchNotifications, isNotificationsLoading, notificationsError] = useFetching(async () => {
        if (!hasLoaded) {
            const responseData = await UserService.getNotifications(0, 4, true)
            setCountNotifications(0)
            setLastNotifications(responseData)
            setHasLoaded(true)
        }
    })

    const thisRef = useRef(null)

    function handleClickOutside(event) {
        if (!(thisRef.current.contains(event.target) || buttonRef.current.contains(event.target)))
            setNotificationsWindowOpen(false)
    }

    useEffect(() => {
        if (isNotificationsWindowOpen) {
            document.addEventListener('click', handleClickOutside, true)
            if (isModalOpen)
                setIsModalOpen(false)
        }
        if (!hasLoaded)
            fetchNotifications()
        return () => document.removeEventListener('click', handleClickOutside, true)
    }, [isNotificationsWindowOpen]);



    return (
        <div ref={thisRef}>
            { isNotificationsWindowOpen ?
                <div className={style.windowMain}>

                    <div className={style.itemList}>
                        { lastNotifications.map((n, index) =>
                            <NotificationItem
                                key={index}
                                notification={n}
                            />
                        )}
                    </div>

                    <div className={style.windowLoaderError}>
                        <MainMessage
                            type={"error"}
                            text={notificationsError}
                        />
                        <MainLoader isLoading={isNotificationsLoading} />
                    </div>

                    <div
                        onClick={() => {
                            setIsModalOpen(true)
                            setNotificationsWindowOpen(false)
                        }}
                        className={style.showMoreBtn}
                    >
                        show more...
                    </div>
                </div>
                : <></> }

            { isModalOpen ?
                <NotificationsListModal
                    setIsModalOpen={setIsModalOpen}
                />
                : <></> }
        </div>
    );
}

export default NotificationWindow;
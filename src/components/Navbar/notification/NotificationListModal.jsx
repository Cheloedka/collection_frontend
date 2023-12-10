import style from "./Notification.module.css";
import {useEffect, useState} from "react";
import UserService from "../../../API/UserService";
import {useFetching} from "../../../hooks/useFetching";
import {usePaginate} from "../../../hooks/usePaginate";
import MModal from "../../UI/modal/MModal";
import NotificationItem from "./NotificationItem";
import MainMessage from "../../UI/message/MainMessage";
import MainLoader from "../../UI/loader/MainLoader";
import {Modal} from "react-bootstrap";

function NotificationsListModal({setIsModalOpen, ...props}) {

    const [notifications, setNotifications] = useState([])

    const [fetchNotifications, isNotificationsLoading, notificationsError] = useFetching(async () => {
        const responseData = await UserService.getNotifications(pageNumber, 15, false)
        setNotifications(prev => [...prev, ...responseData])

        if (responseData.length === 0)
            setCanLoad(false)
    })

    useEffect(() => {
        if (notificationsError)
            setCanLoad(false)
    }, [notificationsError])

    const [pageNumber, lastElement, setCanLoad] = usePaginate(fetchNotifications, isNotificationsLoading)

    return (
        <MModal
            visible={true}
            setVisible={setIsModalOpen}
            {...props}
        >
            <Modal.Header className={style.itemListTitle}>
                <h5> Notifications </h5>
            </Modal.Header>

            <div className={style.itemList}>
                { notifications.map((n, index) =>
                    <NotificationItem key={index} notification={n} />
                )}
            </div>

            { notificationsError ? <br/> : <></> }
            <MainMessage
                type={"error"}
                text={notificationsError}
            />
            <MainLoader isLoading={isNotificationsLoading} />

            {lastElement} {/*element that triggers request*/}
        </MModal>
    );
}

export default NotificationsListModal;
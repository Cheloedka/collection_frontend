import React from 'react';
import style from "./Notification.module.css";
import {getNotificationContent} from "./getNotificationContent";
import {formatDate} from "../../../functions/dateTimeFunctions";

function NotificationItem({notification, ...props}) {
    return (
        <div className={style.itemMain} {...props}>
            {getNotificationContent(notification)}
            <div className={style.itemDate}>
                {formatDate(notification.date)}
            </div>
        </div>
    );
}

export default NotificationItem;
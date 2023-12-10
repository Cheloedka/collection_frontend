import style from "./Notification.module.css";
import ellipsis from "../../../styles/Ellipsis.module.css"
import {linkToItem, linkToUser} from "../../../functions/linkFunctions";


function commentaryReply(notification, isPostReplied) {

    return <div className={style.fadingNotificationContent + " " + ellipsis.main}>
        User {linkToUser(notification.nickname)}
        {isPostReplied ? " left commentary in your " : " replied to your commentary in "}
        <div>
            {linkToItem(notification.itemId, notification.collectionId, notification.ownerItem)}:
        </div>
        <div className={style.commentaryInNotification + " " + ellipsis.childrenClamp2}>
            {notification.message}
        </div>
    </div>
}

export function getNotificationContent(notification) {
    switch (notification.type) {
        case "ADD_FRIEND":
            return <div className={style.fadingNotificationContent}>
                User {linkToUser(notification.nickname)} added you to friend list
            </div>

        case "COMMENT_REPLY":
            return commentaryReply(notification, false)

        case "POST_REPLY":
            return commentaryReply(notification, true)

        case "POST_UPVOTE":
            return <div className={style.fadingNotificationContent}>
                Your { linkToItem(notification.itemId, notification.collectionId, notification.ownerItem) }
                has got {notification.message} upvotes!
            </div>

        case "COMMENT_UPVOTE":
            return <div className={style.fadingNotificationContent}>
                Your commentary in {linkToItem(notification.itemId, notification.collectionId, notification.ownerItem)}
                has got {notification.message} upvotes!
            </div>

    }
}
import {Link} from "react-router-dom";
import style from "./functions.module.css"

export function linkToUser(nickname) {
    return <Link to={"/" + nickname} className={style.linkToUser}>{nickname}</Link>
}
export function linkToItem(itemCountId, collectionId, ownerItem) {
    return <Link to={"/" + ownerItem + "/" + collectionId + "/" + itemCountId} className={style.linkToUser}>post</Link>
}
import React from 'react';
import style from "./UserPageFollowing.module.css";
import {getUserImage} from "../../functions/imageFunctions";

function UserPageFollowing({img, username}) {
    return (
        <div className={style.divImgUserFriend}>
                <img className={style.ImgUserFriend} src={getUserImage(img)} alt={"username"} />
                <div className={style.SpanUserFriend}>{username}</div>
        </div>
    );
}

export default UserPageFollowing;
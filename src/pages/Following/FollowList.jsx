import style from "./FollowingPage.module.css"
import {getUserImage} from "../../functions/imageFunctions";
import {Link} from "react-router-dom";

function FollowList({contentList}) {

    if (contentList.length < 1) {
        return "There is no any followers"
    }



    return (
        <div className={style.usersDiv}>
            {contentList.map(( {name, surname, image, nickname} , index) =>
                <Link
                    key={index}
                    className={style.userDiv}
                    to={"/" + nickname}
                >
                    <img className={style.imgUser} src={getUserImage(image)}/>
                    <div className={style.divSpan}>
                        <span className={style.mainSpan}>{nickname}</span>
                        <span className={style.secondSpan}>{name} {surname}</span>
                    </div>
                </Link>
            )}
        </div>
    );
}

export default FollowList;
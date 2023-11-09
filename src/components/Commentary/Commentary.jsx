import style from "./Commentary.module.css"
import CommentaryList from "./CommentaryList";
import {getUserImage} from "../../functions/imageFunctions";

function Commentary({idCommentary, userImg, userName, date, content, answers}) {
    return (
        <div>
            <div className={style.divTopContent}>
                <div className={style.divUserContent}>
                    <img
                        src={getUserImage(userImg)}
                        className={style.imgUser}
                    />
                    <span className={style.spanUsername}>
                        {userName}
                    </span>
                    <span className={style.spanTime}>
                        {date}
                    </span>
                </div>
                <div className={style.divLikes}>
                    > 12 >
                </div>
            </div>

            <div className={style.divContent}>
                {content}
            </div>

            <div className={style.divBottomContent}>
                <span className={style.spanAnswer}>
                    Answer
                </span>
                <div>
                    ...
                </div>
            </div>

            <div style={{marginLeft: "30px"}}>
                { answers
                    ? <CommentaryList commentaries={answers} />
                    : <></>

                }
            </div>


        </div>
    );
}

export default Commentary;
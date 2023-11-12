import style from "./Commentary.module.css"
import CommentaryList from "./CommentaryList";
import {getUserImage} from "../../functions/imageFunctions";
import {useEffect, useState} from "react";
import CommentaryInput from "./CommentaryInput";

function Commentary({idCommentary, userImg, userName, date, content, answers, idItem}) {


    const [visible, setVisible] = useState(false)
    const [newCommentaries, setNewCommentaries] = useState([])

    useEffect(() => {
        if (newCommentaries)
            setVisible(false)
    }, [newCommentaries])

    return (
        <div>
            <div className={style.commentaryBody}>
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
                    <span className={style.spanAnswer} onClick={() => setVisible(prevState => !prevState)}>
                        { visible
                            ? <>Cancel</>
                            : <>Answer</>
                        }
                    </span>

                    <div className={style.divMore}>
                        ...
                    </div>
                </div>

                { visible
                    ? <CommentaryInput idCommentary={idCommentary} idItem={idItem} setNewCommentaries={setNewCommentaries}/>
                    : <></>
                }

            </div>
            {answers || newCommentaries ?
                <div className={style.divAnswers}>
                    <div className={style.line}></div>
                    <div className={style.answerCommentary}>
                        { answers
                            ? <CommentaryList commentaries={answers} idPost={idItem}/>
                            : <></>
                        }
                        { newCommentaries
                            ? <CommentaryList commentaries={newCommentaries} idPost={idItem} />
                            : <></>
                        }
                    </div>
                </div>
                : <></>
            }
        </div>
    );
}

export default Commentary;
import style from "./Commentary.module.css"
import CommentaryList from "./CommentaryList";
import {getUserImage} from "../../functions/imageFunctions";
import {useContext, useEffect, useState} from "react";
import CommentaryInput from "./CommentaryInput";
import MoreOptionsDropdown from "../UI/dropdown/MoreOptionsDropdown";
import {useFetching} from "../../hooks/useFetching";
import CommentaryService from "../../API/CommentaryService";
import {UserContext} from "../../context";

function Commentary({idCommentary, isDeleted, userImg, userName, date, content, answers, idItem}) {
    const {username} = useContext(UserContext)


    const [visible, setVisible] = useState(false)
    const [deleted, setDeleted] = useState(isDeleted)
    const [newCommentaries, setNewCommentaries] = useState([])


    const [deleteFetch, isLoading, error] = useFetching(async () => {
        await CommentaryService.deleteCommentary(idCommentary)
        setDeleted(true)
    })

    useEffect(() => {
        if (newCommentaries)
            setVisible(false)
    }, [newCommentaries])


    const options = [
        {title: "Delete", onClick: deleteFetch},
        {title: "Edit", onClick: () => console.log("Delete")}
    ]

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
                    { deleted
                        ? <div style={{color:"red"}}>Deleted</div>
                        : <>{content}</>
                    }

                </div>

                <div className={style.divBottomContent}>
                    <span className={style.spanAnswer} onClick={() => setVisible(prevState => !prevState)}>
                        { visible
                            ? <>Cancel</>
                            : <>Answer</>
                        }
                    </span>

                    { username === userName
                        ? <MoreOptionsDropdown options={options} />
                        : <></>
                    }

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
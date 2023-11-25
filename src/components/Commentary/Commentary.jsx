import style from "./Commentary.module.css"
import CommentaryList from "./CommentaryList";
import {getUserImage} from "../../functions/imageFunctions";
import {useContext, useEffect, useState} from "react";
import CommentaryInput from "./CommentaryInput";
import MoreOptionsDropdown from "../UI/dropdown/MoreOptionsDropdown";
import {useFetching} from "../../hooks/useFetching";
import CommentaryService from "../../API/CommentaryService";
import {UserContext} from "../../context";
import {Link} from "react-router-dom";
import MessageModal from "../UI/modal/MessageModal";
import {LikeFunction} from "../../functions/likeFunctions";

function Commentary({idCommentary, userImg, userName, date, content, answers, setDeleted, countLikes, likeDto, idItem}) {
    const {username} = useContext(UserContext)

    const [isLike, setIsLike] = useState(likeDto.isLiked)
    const [likeType, setLikeType] = useState(likeDto.likeType)
    const [count, setCount] = useState(countLikes)

    const [visible, setVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [newCommentaries, setNewCommentaries] = useState([])

    const [comDate, setComDate] = useState(new Date())


    const [deleteFetch, isLoading, error] = useFetching(async () => {
        await CommentaryService.deleteCommentary(idCommentary)
        answers = []
        setNewCommentaries([])
        setDeleted(idCommentary)
    })

    useEffect(() => {
        if (newCommentaries)
            setVisible(false)
    }, [newCommentaries])


    const options = [
        {title: "Delete", onClick: () => setModalVisible(true)},
        {title: "Edit", onClick: () => console.log("Edit")}
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
                            <Link to={"/" + username}>{userName}</Link>
                        </span>
                        <span className={style.spanTime}>
                            {date}
                        </span>
                    </div>
                    <div className={style.divLikes}>
                        { likeType === "Like"
                            ? <div style={{color: "green"}}> > </div>
                            : <div> > </div>
                        }

                        {count}

                        { likeType === "Dislike"
                            ? <div style={{color: "red"}}> > </div>
                            : <div> > </div>
                        }
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

                        { username === userName
                            ? <MoreOptionsDropdown options={options} />
                            : <></>
                        }

                        <MessageModal visible={modalVisible}
                                      setVisible={setModalVisible}
                                      acceptCallback={() => deleteFetch()}
                        >
                            Are you sure to delete commentary?
                        </MessageModal>

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
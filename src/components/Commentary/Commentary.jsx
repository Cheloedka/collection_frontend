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
import MainLoader from "../UI/loader/MainLoader";
import {formatDate} from "../../functions/dateTimeFunctions";

function Commentary({idCommentary, userImg, userName, date, content, answers, setDeleted,
                        countLikes, likeDto, idItem, isEdited}
) {
    const {username} = useContext(UserContext)

    const [isLike, setIsLike] = useState(likeDto.liked)
    const [likeType, setLikeType] = useState(likeDto.likeType)
    const [count, setCount] = useState(countLikes)
    const [contentState, setContentState] = useState(content)
    const [modified, setModified] = useState(isEdited)
    const [newDate, setDate] = useState(date)

    const [answerVisible, setAnswerVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [newCommentaries, setNewCommentaries] = useState([])
    const [moreAnswers, setMoreAnswers] = useState(true)


    const [deleteFetch, isLoading, error] = useFetching(async () => {
        await CommentaryService.deleteCommentary(idCommentary)
        answers = []
        setNewCommentaries([])
        setDeleted(idCommentary)
    })

    useEffect(() => {
        if (newCommentaries)
            setAnswerVisible(false)
    }, [newCommentaries])

    useEffect(() => {
        if (idCommentary) {
            setCount(countLikes)
            setContentState(content)
            setDate(date)
        }
    }, [idCommentary])


    async function likeManager(direction) {
        let func
        if (isLike && likeType === "LIKE" && direction === "up") {
            func = () => CommentaryService.deleteLikeCommentary(idCommentary)
            setCount(prevState => prevState - 1)
            setLikeType("")
            setIsLike(false)

        } else if (isLike && likeType === "DISLIKE" && direction === "down") {
            func = () => CommentaryService.deleteLikeCommentary(idCommentary)
            setCount(prevState => prevState + 1)
            setLikeType("")
            setIsLike(false)

        } else if (!isLike && direction === "up") {
            func = () => CommentaryService.likeCommentary(idCommentary)
            setCount(prevState => prevState + 1)
            setLikeType("LIKE")
            setIsLike(true)

        } else if (!isLike && direction === "down") {
            func = () => CommentaryService.dislikeCommentary(idCommentary)
            setCount(prevState => prevState - 1)
            setLikeType("DISLIKE")
            setIsLike(true)

        } else if (isLike && likeType === "LIKE" && direction === "down") {
            func = () => {
                CommentaryService.deleteLikeCommentary(idCommentary)
                CommentaryService.dislikeCommentary(idCommentary)
            }
            setCount(prevState => prevState - 2)
            setLikeType("DISLIKE")
            setIsLike(true)

        } else if (isLike && likeType === "DISLIKE" && direction === "up") {
            func = () => {
                CommentaryService.deleteLikeCommentary(idCommentary)
                CommentaryService.likeCommentary(idCommentary)
            }
            setCount(prevState => prevState + 2)
            setLikeType("LIKE")
            setIsLike(true)
        }

        if (func) {
            await func()
        }

    }

    useEffect(() => {
        if (contentState !== "" && contentState !== content) {
            setModified(true)
            setDate("")
        }


    }, [contentState])


    const options = [
        {title: "Delete", onClick: () => setModalVisible(true)},
        {title: "Edit", onClick: () => setEditMode(true)}
    ]

    return (
        <div>
            {moreAnswers ?
                <>
                    <div style={{margin: "10px 0"}}>
                        <div className={style.divTopContent}>
                            <div className={style.divUserContent}>
                                <img
                                    alt={"user picture"}
                                    src={getUserImage(userImg)}
                                    className={style.imgUser}
                                />
                                <span className={style.spanUsername}>
                                <Link to={"/" + username}>{userName}</Link>
                                </span>
                                <span className={style.spanTime}>
                                    <div>
                                        { modified
                                            ? <i> Modified {formatDate(newDate)} </i>
                                            : <> {formatDate(newDate)} </>
                                        }
                                    </div>
                                </span>
                            </div>

                            <div className={style.divLikes}>
                                <div
                                    className={style.divLikeCommentary}
                                    onClick={() => likeManager("up")}
                                >
                                    {likeType === "LIKE"
                                        ? <div style={{color: "green"}}> &#94; </div>
                                        : <div> &#94; </div>
                                    }
                                </div>

                                <div style={{minWidth: "17px", textAlign: "center"}}>
                                    {isLoading
                                        ? <MainLoader color={"#383156"} size={"5px"}/>
                                        :
                                        <div style={count > 5 ? {color: "green"} : count < -5 ? {color: "red"} : {}}>
                                            {count}
                                        </div>
                                    }
                                </div>

                                <div
                                    className={style.divDislikeCommentary}
                                    onClick={() => likeManager("down")}
                                >
                                    {likeType === "DISLIKE"
                                        ? <div style={{color: "red"}}>
                                            &#94;
                                        </div>
                                        : <div>
                                            &#94;
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        {editMode
                            ?
                            <>
                            <span
                                className={style.spanAnswer}
                                onClick={() => setEditMode(false)}
                            >
                                Cancel
                            </span>
                                <CommentaryInput
                                    idCommentary={idCommentary}
                                    isEdit={true}
                                    setCurrentContent={setContentState}
                                    currentContent={contentState}
                                    setVisible={setEditMode}
                                />
                            </>
                            :
                            <>
                                <div className={style.divContent}>
                                    {contentState}
                                </div>

                                <div className={style.divBottomContent}>
                                <span
                                    className={style.spanAnswer}
                                    onClick={() => setAnswerVisible(prevState => !prevState)}
                                >
                                    {answerVisible
                                        ? <> Cancel </>
                                        : <> Answer </>
                                    }
                                </span>

                                    {username === userName
                                        ? <MoreOptionsDropdown options={options} />
                                        : <></>
                                    }

                                    <MessageModal
                                        visible={modalVisible}
                                        setVisible={setModalVisible}
                                        acceptCallback={() => deleteFetch()}
                                    >
                                        Are you sure to delete commentary?
                                    </MessageModal>

                                </div>

                                {answerVisible ?
                                    <CommentaryInput
                                        idCommentary={idCommentary}
                                        idItem={idItem}
                                        setNewCommentaries={setNewCommentaries}
                                    />
                                    : <></>
                                }
                            </>
                        }


                    </div>
                    <div>
                        {answers || newCommentaries ?
                            <div className={style.divAnswers}>

                                <div className={style.line}
                                     onClick={() => setMoreAnswers(false)}
                                >
                                </div>

                                <div className={style.answerCommentary}>
                                    {newCommentaries
                                        ? <CommentaryList commentaries={newCommentaries} idPost={idItem}/>
                                        : <></>
                                    }

                                    {answers
                                        ? <CommentaryList commentaries={answers} idPost={idItem}/>
                                        : <></>
                                    }
                                </div>


                            </div>
                            : <></>
                        }
                    </div>
                </>
                :
                <div style={{margin: "10px 0"}}>
                    <div className={style.divTopContent}>
                        <div className={style.divUserContent}>
                            <img
                                alt={"user picture"}
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
                    </div>
                    <div
                        className={style.divShowMore}
                        onClick={() => setMoreAnswers(true)}
                    >
                        Show More
                    </div>
                </div>
            }
        </div>
    );
}

export default Commentary;
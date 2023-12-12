import {useContext, useEffect, useState} from 'react';
import style from "./CommentaryInput.module.css";
import M1Button from "../UI/button/M1Button";
import {UserContext} from "../../context";
import {useFetching} from "../../hooks/useFetching";
import CommentaryService from "../../API/CommentaryService";
import MTextarea2 from "../UI/input/MTextarea2";
import MainLoader from "../UI/loader/MainLoader";

function CommentaryInput({idItem, idCommentary, setNewCommentaries, isEdit, setCurrentContent, currentContent, setVisible}) {

    const {username, userOriginalImage} = useContext(UserContext)

    const [commentaryContent, setCommentaryContent] = useState(currentContent ? currentContent : "")
    const [errorMessage, setErrorMessage] = useState("")


    const [commentaryCreateFetch, isLoading, error] = useFetching( async () => {
        let newCommentary = {
            answerToItem: idItem,
            content: commentaryContent
        }

        if (idCommentary) {
            newCommentary = {...newCommentary, answerToId: idCommentary}
        }
        const response = await CommentaryService.newCommentary(newCommentary)

        newCommentary = {
            ...newCommentary,
            author: {
                nickname: username,
                image: userOriginalImage
            },
            id: response,
            countLikes: 0,
            likeDto: {
                liked: false
            }
        }
        setNewCommentaries(prevState => [newCommentary, ...prevState])
    })

    const [commentaryEditFetch, isEditLoading, editError] = useFetching( async () => {
        await CommentaryService.editCommentary(idCommentary, {content: commentaryContent})
        setCurrentContent(commentaryContent)
        setVisible(false)
    })

    useEffect(() => {
        setErrorMessage(error)
    }, [error, editError])


    function declareCommentaryData(e) {
        e.preventDefault()
        if (commentaryContent === "") {
            setErrorMessage("Comment can't be empty")
        } else if (isEdit) {
            commentaryEditFetch()
            setCommentaryContent("")
        } else {
            commentaryCreateFetch()
            setCommentaryContent("")
        }
    }

    return (
        <form onSubmit={declareCommentaryData} className={style.divNewCommentary}>
            <div className={style.input}>
                <MTextarea2
                    placeholder="New Commentary"
                    type="name"
                    value={commentaryContent}
                    onChange={event => setCommentaryContent(event.target.value)}
                    maxLength = {540}
                    length={commentaryContent.length}
                >

                </MTextarea2>
            </div>
            <M1Button>
                { isLoading
                    ? <MainLoader color="white" />
                    : "Send"
                }
            </M1Button>
        </form>
    );
}

export default CommentaryInput;
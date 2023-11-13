import React, {useContext, useEffect, useState} from 'react';
import style from "./CommentaryInput.module.css";
import MTextarea from "../UI/input/MTextarea";
import M1Button from "../UI/button/M1Button";
import {UserContext} from "../../context";
import {useFetching} from "../../hooks/useFetching";
import CommentaryService from "../../API/CommentaryService";
import MTextarea2 from "../UI/input/MTextarea2";

function CommentaryInput({idItem, idCommentary, setNewCommentaries}) {

    const {username, userOriginalImage} = useContext(UserContext)

    const [commentaryContent, setCommentaryContent] = useState("")
    const [errorMessage, setErrorMessage] = useState("")


    const [commentaryFetch, isLoading, error] = useFetching( async () => {
        let data = {
            answerToItem: idItem,
            content: commentaryContent
        }

        if (idCommentary) {
            data = {...data, answerToId: idCommentary}
        }

        await CommentaryService.newCommentary(data)

        let author = {
            nickname: username,
            image: userOriginalImage
        }
        const d = new Date()
        data = {...data, author: author, creationDate: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()}
        setNewCommentaries(prevState => [...prevState, data])
    })

    useEffect(() => {
        setErrorMessage(error)
    }, [error])

    function declareCommentaryData(e) {
        e.preventDefault()
        if (commentaryContent === "") {
            setErrorMessage("Comment can't be empty")
        }
        else {
            commentaryFetch()
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
            <M1Button>Send</M1Button>
        </form>
    );
}

export default CommentaryInput;
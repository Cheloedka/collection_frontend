import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import CommentaryService from "../../API/CommentaryService";
import Commentary from "./Commentary";
import {useLoadingAndError} from "../../hooks/useLoadingAndError";
import MainMessage from "../UI/message/MainMessage";
import MainLoader from "../UI/loader/MainLoader";

function CommentaryList({commentaries, idPost}) {

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState("")

    const [comment, setComment] = useState([])
    const [deleted, setDeleted] = useState(-1)


    const [commentaryFetch, isFetchLoading, fetchError] = useFetching( async () => {
        const response = await CommentaryService.getCommentaries(idPost)
        setComment(response)
    })

    useEffect(() => {
        if(commentaries) {
            setComment(commentaries)
        }
        else {
            commentaryFetch()
        }
    }, [commentaries, idPost])

    useEffect(() => {
        if(deleted !== -1)
            setComment(c => c.filter(i => i.id !== deleted))
    }, [deleted])


    useLoadingAndError(isFetchLoading, setIsLoading, fetchError, setError)

    if (comment) {
        return (
            <div>
                <MainMessage
                    type={"error"}
                    text={error}
                />

                { comment.map((c, index) =>
                    <Commentary
                        key={index}
                        idCommentary={c.id}
                        content={c.content}
                        date={c.creationDate}
                        userName={c.author.nickname}
                        userImg={c.author.image}
                        answers={c.answers}
                        idItem={idPost}
                        setDeleted={setDeleted}
                        countLikes={c.countLikes}
                        likeDto={c.likeDto}
                    />
                )}
            </div>
        );
    }
    else {
        return(<MainLoader isLoading={isLoading} color={"white"} />)
    }

}

export default CommentaryList;
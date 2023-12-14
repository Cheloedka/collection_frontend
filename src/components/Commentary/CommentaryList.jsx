import React, {useEffect, useMemo, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import CommentaryService from "../../API/CommentaryService";
import Commentary from "./Commentary";
import {useLoadingAndError} from "../../hooks/useLoadingAndError";
import MainMessage from "../UI/message/MainMessage";
import MainLoader from "../UI/loader/MainLoader";

function CommentaryList({commentaries, idPost, sort}) {

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState("")

    const [comment, setComment] = useState([])
    const [deleted, setDeleted] = useState(-1)

    const [commentaryFetch, isFetchLoading, fetchError] = useFetching( async () => {
        const response = await CommentaryService.getCommentaries(idPost)
        setComment(response)
    })

    useEffect(() => {
        if (commentaries) {
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



    const sortedCommentaries = useMemo(() => {
        if (sort) {
            return [...comment].sort((x, y) => y[sort] - x[sort] )
        }
        return comment

    }, [sort, comment])


    useLoadingAndError(isFetchLoading, setIsLoading, fetchError, setError)

    if (sortedCommentaries) {
        return (
            <div>
                <MainMessage
                    type={"error"}
                    text={error}
                />

                { sortedCommentaries
                    .map((c, index) =>
                        <Commentary
                            key={index}
                            idCommentary={c.id}
                            content={c.content}
                            date={c.creationDate}
                            userName={c.author != null ? c.author.nickname : null}
                            userImg={c.author != null ? c.author.image : null}
                            answers={c.answers}
                            idItem={c.answerToItem}
                            setDeleted={setDeleted}
                            countLikes={c.countLikes}
                            likeDto={c.likeDto}
                            isEdited={c.edited}
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
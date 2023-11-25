import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import CommentaryService from "../../API/CommentaryService";
import Commentary from "./Commentary";

function CommentaryList({commentaries, idPost}) {

    const [comment, setComment] = useState()
    const [deleted, setDeleted] = useState(-1)

    const [commentaryFetch, isLoading, error] = useFetching( async () => {
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

    if (comment) {
        return (
            <div>
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

    }

}

export default CommentaryList;
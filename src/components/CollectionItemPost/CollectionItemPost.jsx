import React, {useState} from 'react';
import style from './CollectionItemPost.module.css'
import Like from "../UI/svg/Like";
import LikeFill from "../UI/svg/LikeFill";
import Comment from "../UI/svg/Comment";
import MDiv from "../UI/div/MDiv";
import CommentaryList from "../Commentary/CommentaryList";
import CommentaryInput from "../Commentary/CommentaryInput";
import LikeService from "../../API/LikeService";
import {getCollectionImage} from "../../functions/imageFunctions";
import ImageModal from "../images/ImageModal";

function CollectionItemPost({img, text1, text2, likesCount, id, isLiked, commentsCount, ...props}) {

    const [newCommentaries, setNewCommentaries] = useState([])

    const [isLike, setIsLike] = useState(isLiked)
    const [count, setCount] = useState(likesCount)
    const [isOpened, setIsOpened] = useState(false)
    const [currentImage, setCurrentImage] = useState(0)



    async function manageLikes(isDelete) {
        let func
        if (isDelete) {
            func = () => LikeService.deleteLike(id)
            setCount(prevState => prevState - 1)
        }
        else {
            func = () => LikeService.newLike(id)
            setCount(prevState => prevState + 1)
        }


        await func()
        setIsLike(prev => !prev)

    }

    async function manageImages(direction) {
        if (direction === "left" && currentImage > 0) {
            setCurrentImage(prevState => prevState - 1)
        }
        else if (direction === "right" && currentImage < img.length - 1) {
            setCurrentImage(prevState => prevState + 1)
        }
    }

    return (
        <MDiv className={style.mainDiv}>

            <div className={style.divSpan}>
                <span className={style.span1}>{text1}</span>
                <span className={style.span2}>{text2}</span>
            </div>


            <div className={style.divGraphicContent}>
                <div className={style.divImage}>

                    <div className={style.leftImageButton}
                         onClick={() => manageImages("left")}
                    >
                        left
                    </div>

                    <img src={getCollectionImage(img[currentImage].name)} className={style.imgItem} onClick={() => setIsOpened(true)}/>

                    <div className={style.rightImageButton}
                         onClick={() => manageImages("right")}
                    >
                        right
                    </div>

                    <ImageModal isOpened={isOpened} setIsOpened={setIsOpened} src={getCollectionImage(img[currentImage].name)}/>
                </div>

                <div className={style.divBottomPanel}>
                        {isLike
                            ?<div onClick={() => manageLikes(true)} className={style.divBorder + " " + style.divBorderLike}>
                                <LikeFill />
                                <span> {count} </span>
                            </div>
                            :
                            <div onClick={() => manageLikes(false)} className={style.divBorder + " " + style.divBorderLike}>
                                <Like />
                                <span> {count} </span>
                            </div>

                        }

                    <div className={style.divBorder}>
                        <Comment width="20"/>
                        <span> 12 </span>
                    </div>

                </div>

                <hr />

                <div className={style.divCommentary}>
                    <CommentaryList idPost={id}/>
                    { newCommentaries
                        ? <CommentaryList commentaries={newCommentaries} idPost={id}/>
                        : <></>
                    }
                </div>

                <CommentaryInput setNewCommentaries={setNewCommentaries} idItem={id}/>
            </div>
        </MDiv>
    );
}

export default CollectionItemPost;
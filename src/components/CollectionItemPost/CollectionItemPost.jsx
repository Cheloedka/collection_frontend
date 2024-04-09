import React, {useContext, useState} from 'react';
import style from './CollectionItemPost.module.css'
import Like from "../UI/svg/Like";
import LikeFill from "../UI/svg/LikeFill";
import Comment from "../UI/svg/Comment";
import MDiv from "../UI/div/MDiv";
import CommentaryList from "../Commentary/CommentaryList";
import CommentaryInput from "../Commentary/CommentaryInput";
import LikeService from "../../API/LikeService";
import {getCollectionImage, getUserImage} from "../../functions/imageFunctions";
import ImageModal from "../images/ImageModal";
import {LikeFunction} from "../../hooks/likeFunctions";
import {formatDate} from "../../functions/dateTimeFunctions";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context";

function CollectionItemPost({infoName, infoImage,
                                img, information,
                                text1, text2,
                                likesCount,
                                id, countId,
                                collectionId, username,
                                isLiked,
                                commentsCount,
                                creationTime,
                                type,
                                ...props}
) {

    const [isLike, setIsLike] = useState(isLiked)
    const [count, setCount] = useState(likesCount)
    const [isOpened, setIsOpened] = useState(false)
    const [currentImage, setCurrentImage] = useState(0)
    const {isAuth} = useContext(AuthContext)
    const navigate = useNavigate()



    async function manageLikes(isDelete) {
        await LikeFunction(isDelete, id, setIsLike, setCount)
    }

    async function manageImages(direction) {
        if (direction === "left") {
            setCurrentImage(prevState => prevState - 1)
        }
        else if (direction === "right") {
            setCurrentImage(prevState => prevState + 1)
        }
    }

    return (
        <MDiv className={style.mainDiv}>
            <Link className={style.divUserContent}
                  to={type === "COLLECTION" ? "/" + username : "/" + username + "/" + collectionId}
            >
                <img
                    src={getCollectionImage(infoImage)}
                    className={style.imgUser}
                />
                <div className={style.userInfo}>
                <span className={style.spanUsername}>
                    {infoName}
                </span>
                    <span className={style.spanTime}>
                    {formatDate(creationTime)}
                </span>
                </div>
            </Link>

            <div className={style.divSpan}>
                <span className={style.span1}>{text1}</span>
                <span className={style.span2}>{text2}</span>
            </div>

            <div>
                <div className={style.divImage}>
                        {img.length > 0 ?
                            <>
                                { currentImage > 0 ?
                                    <div className={style.leftImageButton}
                                         onClick={() => manageImages("left")}
                                    >
                                        >
                                    </div>
                                    :<></>
                                }

                                <img src={getCollectionImage(img[currentImage].name)} className={style.imgItem} onClick={() => setIsOpened(true)}/>

                                { currentImage < img.length - 1 ?
                                    <div className={style.rightImageButton}
                                         onClick={() => manageImages("right")}
                                    >
                                        >
                                    </div>
                                    :<></>
                                }

                                <ImageModal isOpened={isOpened} setIsOpened={setIsOpened} src={getCollectionImage(img[currentImage].name)}/>
                            </>
                            : <></>

                        }
                </div>
                <div className={style.divSpan}>
                    <span className={style.span2}>{information}</span>
                </div>


                <div className={style.divBottomPanel}>
                    { isAuth ?
                        <>
                            {isLike
                                ?<div onClick={() => manageLikes(true)} className={style.divBorder + " " + style.divBorderLike}>
                                    <LikeFill />
                                    <span style={{minWidth: "10px"}}> {count} </span>
                                </div>
                                :
                                <div onClick={() => manageLikes(false)} className={style.divBorder + " " + style.divBorderLike}>
                                    <Like />
                                    <span style={{minWidth: "10px"}}> {count} </span>
                                </div>

                            }
                        </>
                        : <div onClick={() => navigate("/login")} className={style.divBorder + " " + style.divBorderLike}>
                                <Like />
                                <span style={{minWidth: "10px"}}> {count} </span>
                          </div>
                    }

                    <Link to={"/" + username + "/" + collectionId + "/" + countId}>
                        <div className={style.divBorder}>
                            <Comment width="20"/>
                            <span> {commentsCount} </span>
                        </div>
                    </Link>

                </div>
            </div>
        </MDiv>
    );
}

export default CollectionItemPost;
import {useState} from 'react';
import style from './CollectionItemPost.module.css'
import Like from "../UI/svg/Like";
import LikeFill from "../UI/svg/LikeFill";
import Comment from "../UI/svg/Comment";
import MDiv from "../UI/div/MDiv";
import CommentaryList from "../Commentary/CommentaryList";
import CommentaryInput from "../Commentary/CommentaryInput";

function CollectionItemPost({img, text1, text2, like, id, isLiked, ...props}) {

    const [newCommentaries, setNewCommentaries] = useState([])

    return (
        <MDiv className={style.mainDiv}>

            <div className={style.divSpan}>
                <span className={style.span1}>{text1}</span>
                <span className={style.span2}>{text2}</span>
            </div>


            <div className={style.divGraphicContent}>
                <div className={style.divImage}>
                    <img src={img} className={style.imgItem}/>
                </div>

                <div className={style.divBottomPanel}>

                    <div className={style.divBorder + " " + style.divBorderLike}>
                        {isLiked
                            ? <LikeFill width="20" />
                            : <Like width="20" />
                        }
                        <span> 12</span>
                    </div>

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
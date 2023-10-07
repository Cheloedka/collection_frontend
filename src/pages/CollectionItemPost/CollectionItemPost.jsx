import React from 'react';
import style from './CollectionItemPost.module.css'
import Like from "../../components/UI/svg/Like";
import LikeFill from "../../components/UI/svg/LikeFill";
import Comment from "../../components/UI/svg/Comment";
import MDiv from "../../components/UI/div/MDiv";
import MInput from "../../components/UI/input/MInput";
import M1Button from "../../components/UI/button/M1Button";
import M2Button from "../../components/UI/button/M2Button";

function CollectionItemPost({img, text1, text2, like, id, isLiked, username, ...props}) {
    return (
        <MDiv className={style.mainDiv}>
            <div className={style.div}>
                {username
                    ?<></>
                    :<></>
                }
            </div>

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
                        <span> 12</span>
                    </div>

                </div>

                <hr />

                <MInput placeholder="New Commentary"/>
                <M2Button>Send</M2Button>

            </div>
        </MDiv>
    );
}

export default CollectionItemPost;
import style from './CollectionPageItem.module.css'
import ellipsis from "../../../styles/Ellipsis.module.css"
import Like from "../../../components/UI/svg/Like";
import LikeFill from "../../../components/UI/svg/LikeFill";
import React, {useEffect, useState} from "react";
import LikeService from "../../../API/LikeService";
import {useFetching} from "../../../hooks/useFetching";
import MainLoader from "../../../components/UI/loader/MainLoader";

function CollectionPageItem({img, text1, text2, like, id, ...props}) {

    const [isLike, setIsLike] = useState(false)

    const [isLikeFetch, isLoading, error] = useFetching( async () => {
        const response = await LikeService.isLiked(id)
        setIsLike(response)

    })

    useEffect(() => {
        if (id)
            isLikeFetch()
    },[])


    async function manageLikes(isDelete) {
        let func
        if (isDelete)
            func = () => LikeService.deleteLike(id)
        else
            func = () => LikeService.newLike(id)

        await func().then(r => console.log(r))
        setIsLike(prev => !prev)
    }

    return (
        <div className={style.mainDiv} {...props}>
            <img src={img} className={style.itemImg}/>
            <span className={style.mainSpan}>{text1}</span>
            <div className={ellipsis.main}>
                <span className={style.secondSpan + " " + ellipsis.childrenClamp2}>{text2}</span>
            </div>
            {isLoading
                ? <MainLoader color={"black"}/>
                :
                <button className={style.like}>
                    {isLike
                        ?<div onClick={() => manageLikes(true)}>
                            <LikeFill />
                        </div>
                        :
                        <div onClick={() => manageLikes(false)}>
                            <Like />
                        </div>

                    }

                </button>
            }
        </div>
    );
}

export default CollectionPageItem;
import style from './CollectionPageItem.module.css'
import ellipsis from "../../../styles/Ellipsis.module.css"
import Like from "../../../components/UI/svg/Like";
import LikeFill from "../../../components/UI/svg/LikeFill";
import {useContext, useState} from "react";
import LikeService from "../../../API/LikeService";
import {Link, useParams} from "react-router-dom";

function CollectionPageItem({img, text1, text2, like, id, isLiked, countID, idCollection, ...props}) {
    const params = useParams()
    const [isLike, setIsLike] = useState(isLiked)



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
            <Link to={"/" + params.username + "/" + idCollection + "/" + countID} className={style.linkDiv}>
                <img src={img} className={style.itemImg}/>
                <span className={style.mainSpan}>{text1}</span>
                <div className={ellipsis.main}>
                    <span className={style.secondSpan + " " + ellipsis.childrenClamp2}>{text2}</span>
                </div>
            </Link>
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
        </div>
    );
}

export default CollectionPageItem;
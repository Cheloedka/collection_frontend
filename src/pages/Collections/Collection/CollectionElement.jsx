import style from './CollectionElement.module.css'
import ellipsis from "../../../styles/Ellipsis.module.css"
import Like from "../../../components/UI/svg/Like";
import LikeFill from "../../../components/UI/svg/LikeFill";
import {useState} from "react";

function CollectionElement({img, text1, text2, like, ...pros}) {

    const [isLike, setIsLike] = useState(false)


    async function manageLikes(isDelete) {
        /*let func
        if (isDelete)
            func = () =>
        else
            func = () =>

        await func().then(r => console.log(r))*/
        setIsLike(prev => !prev)
    }

    return (
        <div className={style.mainDiv} {...pros}>
            <img src={img} className={style.itemImg}/>
            <span className={style.mainSpan}>{text1}</span>
            <div className={ellipsis.main}>
                <span className={style.secondSpan + " " + ellipsis.childrenClamp2}>{text2}</span>
            </div>
            <button className={style.like} onClick={() => manageLikes()}>
                {isLike
                    ?<LikeFill />
                    :<Like />

                }

            </button>
        </div>
    );
}

export default CollectionElement;
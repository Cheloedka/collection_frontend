import style from './CollectionElement.module.css'
import Like from "../../../components/UI/svg/Like";
import LikeFill from "../../../components/UI/svg/LikeFill";
import {useState} from "react";
import image from "../../../images/fumo.jpg"

function CollectionElement({img, text1, text2, like}) {

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
        <div className={style.mainDiv}>
            <img src={image} className={style.itemImg}/>
            <span className={style.mainSpan}>My cute small fumo</span>
            <span className={style.secondSpan}>Some info about this fumo and more info about</span>
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
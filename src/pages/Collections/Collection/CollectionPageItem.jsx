import style from './CollectionPageItem.module.css'
import ellipsis from "../../../styles/Ellipsis.module.css"
import {Link, useParams} from "react-router-dom";

function CollectionPageItem({img, text1, text2, id, countID, idCollection, ...props}) {
    const params = useParams()

    return (
        <div className={style.mainDiv} {...props}>
            <Link to={"/" + params.username + "/" + idCollection + "/" + countID} className={style.linkDiv}>
                <img src={img} className={style.itemImg}/>
                <span className={style.mainSpan}>{text1}</span>
                <div className={ellipsis.main}>
                    <span className={style.secondSpan + " " + ellipsis.childrenClamp2}>{text2}</span>
                </div>
            </Link>
        </div>
    );
}

export default CollectionPageItem;
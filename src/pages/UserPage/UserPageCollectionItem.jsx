import style from "./UserPageCollectionItem.module.css";
import spans from "../../styles/Spans.module.css"
import ellipsis from "../../styles/Ellipsis.module.css"
import {getCollectionImage} from "../../functions/imageFunctions";

function UserPageCollectionItem({img, about, name}) {
    return (
        <div className={style.main}>
            <img
                className={style.ImgCollection}
                src={getCollectionImage(img)}
                alt={"collectionName"}
            />
            <div className={style.divAboutCollection}>
                <span className={spans.mainSpan}>
                    {name}
                </span>
                <div className={ellipsis.main}>
                    <span className={spans.secondSpan + " " + ellipsis.childrenClamp1 + " " + style.secondSpan}>
                    {about}
                </span>
                </div>
            </div>
        </div>
    );
}

export default UserPageCollectionItem;
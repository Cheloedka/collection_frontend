import style from "./UserPageCollectionItem.module.css";
import ellipsis from "../../styles/Ellipsis.module.css"
import {getCollectionImage} from "../../functions/imageFunctions";

function UserPageCollectionItem({img, about, name}) {
    return (
        <div className={style.divCollection}>
            <img
                className={style.ImgCollection}
                src={getCollectionImage(img)}
                alt={"collectionName"}
            />
            <div className={style.divAboutCollection}>
                <span className={style.spanCollectionMainSpan}>
                    {name}
                </span>
                <div className={ellipsis.main}>
                    <span className={style.spanCollectionSecondSpan + " " + ellipsis.childrenClamp1}>
                    {about}
                </span>
                </div>
            </div>
        </div>
    );
}

export default UserPageCollectionItem;
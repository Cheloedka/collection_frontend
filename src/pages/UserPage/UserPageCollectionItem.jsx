import style from "./UserPageCollectionItem.module.css";
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
                <span className={style.spanCollectionSecondSpan}>
                    {about}
                </span>
            </div>
        </div>
    );
}

export default UserPageCollectionItem;
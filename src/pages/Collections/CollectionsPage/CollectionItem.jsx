import React, {useState} from 'react';
import style from './CollectionItem.module.css'
import {Link, useParams} from "react-router-dom";
import {getCollectionImage} from "../../../functions/imageFunctions";
import ellipsis from "../../../styles/Ellipsis.module.css"
import ImageModal from "../../../components/images/ImageModal";

function CollectionItem({img, about, name, id, count}) {
    const params = useParams()

    const [isOpened, setIsOpened] = useState(false)

    return (
        <div className={style.divCollection}>
            <ImageModal src={getCollectionImage(img)} isOpened={isOpened} setIsOpened={setIsOpened}/>
            <div className={style.imageDiv}>
                <img
                    src={getCollectionImage(img)}
                    className={style.imageCollection}
                    onClick={() => setIsOpened(true)}
                />
                <div className={style.itemsCountDiv}>
                    {count}
                </div>
            </div>


            <div className={style.info}>

                <div className={ellipsis.main + " " + style.spansDiv}>
                    <div className={style.mainSpan}>{name}</div>
                    <div className={ellipsis.childrenClamp3 + " " + style.secondSpan}>{about}</div>
                </div>

                <Link
                    to={'/' + params.username + '/' + id}
                    className={style.buttonMoreInformation}
                >
                    More information
                </Link>

            </div>

        </div>
    );
}

export default CollectionItem;
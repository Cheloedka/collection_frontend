import React from 'react';
import style from './CollectionItem.module.css'
import {Link} from "react-router-dom";
import {getCollectionImage} from "../../../functions/imageFunctions";
import ellipsis from "../../../styles/Ellipsis.module.css"

function CollectionItem({img, about, name, username, id}) {
    return (
        <div className={style.divCollection}>
            <img
                src={getCollectionImage(img)}
                className={style.imageCollection}
            />
            <div className={style.info}>
                <div className={ellipsis.main}>
                    <div>{name}</div>
                    <div className={ellipsis.childrenClamp4}>{about}</div>
                </div>
                <Link
                    to={'/' + username + '/' + id}
                    className={style.buttonMoreInformation}
                >
                    More information
                </Link>
            </div>

        </div>
    );
}

export default CollectionItem;
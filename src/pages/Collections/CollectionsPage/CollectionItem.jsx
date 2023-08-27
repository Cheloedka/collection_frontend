import React from 'react';
import style from './CollectionItem.module.css'
import {Link} from "react-router-dom";
import {getCollectionImage} from "../../../functions/imageFunctions";

function CollectionItem({img, about, name, username, id}) {
    return (
        <div className={style.divCollection}>
            <img
                src={getCollectionImage(img)}
                className={style.imageCollection}
            />
            <div className={style.info}>
                <div>
                    <div>{name}</div>
                    <div>{about}</div>
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
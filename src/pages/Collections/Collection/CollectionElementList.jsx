import React from 'react';
import CollectionElement from "./CollectionElement";
import style from "./CollectionElementList.module.css"
import {getCollectionImage} from "../../../functions/imageFunctions";

function CollectionElementList({items}) {
    return (
        <div className={style.mainDivList}>

            {items.map((c, index) =>
                <CollectionElement
                    key={index}
                    img={getCollectionImage(c.itemImage)}
                    text1={c.itemName}
                    text2={c.itemAbout}
                />
            )}
        </div>
    );
}

export default CollectionElementList;
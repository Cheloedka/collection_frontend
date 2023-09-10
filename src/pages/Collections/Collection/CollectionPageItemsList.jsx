import React from 'react';
import CollectionPageItem from "./CollectionPageItem";
import style from "./CollectionPageItemsList.module.css"
import {getCollectionImage} from "../../../functions/imageFunctions";

function CollectionPageItemsList({items}) {
    return (
        <div className={style.mainDivList}>

            {items.map((c, index) =>
                <CollectionPageItem
                    key={index}
                    img={getCollectionImage(c.itemImage)}
                    text1={c.itemName}
                    text2={c.itemAbout}
                    id={c.itemId}
                />
            )}
        </div>
    );
}

export default CollectionPageItemsList;
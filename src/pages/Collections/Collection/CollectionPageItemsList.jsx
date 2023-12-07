import React from 'react';
import CollectionPageItem from "./CollectionPageItem";
import style from "./CollectionPageItemsList.module.css"
import {getCollectionImage} from "../../../functions/imageFunctions";

function CollectionPageItemsList({items, idCollection}) {

    return (
        <div className={style.mainDivList}>

            {items
                .sort((x, y) => x.countId - y.countId)
                .slice(0, 5)
                .map((c, index) =>
                    <CollectionPageItem
                        key={index}
                        img={getCollectionImage(c.itemImage)}
                        text1={c.itemName}
                        text2={c.itemAbout}
                        countID={c.countId}
                        idCollection={idCollection}
                    />
            )
            }
        </div>
    );
}

export default CollectionPageItemsList;
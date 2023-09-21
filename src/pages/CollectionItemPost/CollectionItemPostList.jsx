import React from 'react';
import CollectionItemPost from "./CollectionItemPost";
import {getCollectionImage} from "../../functions/imageFunctions";

function CollectionItemPostList({items}) {
    return (
        <div>
            {items
                .sort((x, y) => y.itemId - x.itemId)
                .map((c, index) =>
                <CollectionItemPost
                    key={index}
                    img={getCollectionImage(c.itemImage)}
                    text1={c.itemName}
                    text2={c.itemAbout}
                    id={c.itemId}
                    isLiked={c.liked}
                    countID={c.countId}
                />
            )}

        </div>
    );
}

export default CollectionItemPostList;
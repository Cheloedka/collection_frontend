import React, {useEffect, useState} from 'react';
import CollectionItemPost from "./CollectionItemPost";
import {getCollectionImage} from "../../functions/imageFunctions";
import style from "./CollectionItemPost.module.css"
import {useFetching} from "../../hooks/useFetching";
import ItemService from "../../API/ItemService";
import {useParams} from "react-router-dom";

function CollectionItemPostList({items}) {


    if (items) {
        return (
            <div className={style.divList}>
                {items
                    .sort((x, y) => y.itemId - x.itemId)
                    .map((c, index) =>
                        <CollectionItemPost
                            key={index}
                            img={c.images}
                            text1={c.name}
                            text2={c.about}
                            information={c.information}
                            id={c.itemId}
                            isLiked={c.liked}
                            likesCount={c.likesCount}
                            commentsCount={c.commentsCount}
                            infoName={c.infoName}
                            infoImage={c.infoImage}
                        />
                    )}

            </div>
        );
    }

}

export default CollectionItemPostList;
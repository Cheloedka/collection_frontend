import React, {useEffect, useState} from 'react';
import CollectionItemPost from "./CollectionItemPost";
import style from "./CollectionItemPost.module.css"
import {useFetching} from "../../hooks/useFetching";
import ItemService from "../../API/ItemService";
import {usePaginate} from "../../hooks/usePaginate";
import {useParams} from "react-router-dom";
import MainMessage from "../UI/message/MainMessage";

function CollectionItemPostList({username, idCollection, type}) {
    const params = useParams()

    const [items, setItems] = useState([])

    const [itemsFetch, isLoadingItems, errorItems] = useFetching( async () => {
        let response;
        if (type === "COLLECTION")
            response = await ItemService.getAllItemsByCollection(idCollection, pageNumber)
        if (type === "USER")
            response = await ItemService.getAllItemsByUser(username, pageNumber)

        if (response.length === 0)
            setCanLoad(false)
        else
            setItems(prev => [...prev, ...response])
    })


    const [pageNumber, triggerElement, setCanLoad, clearData] = usePaginate(itemsFetch, isLoadingItems)

    useEffect(() => {
        console.log("pageNumber: ", pageNumber)
    }, [pageNumber])


    useEffect(() => {
        setItems([])
        clearData()
    }, [params.username, params.idCollection])

    return (
        <div>
            <MainMessage type={"error"} text={errorItems}/>
            <div className={style.divList}>
                { items.length > 0 ?
                    <>
                        { items
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
                                    creationTime={c.creationTime}
                                    username={username ? username : c.username}
                                    countId={c.countId}
                                    collectionId={idCollection ? idCollection : c.collectionId}
                                />
                            )}
                    </>
                    : "Not found"
                }
            </div>
            {triggerElement}
        </div>
    );

}

export default CollectionItemPostList;
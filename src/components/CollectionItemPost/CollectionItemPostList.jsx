import {useEffect, useState} from 'react';
import CollectionItemPost from "./CollectionItemPost";
import style from "./CollectionItemPost.module.css"
import {useFetching} from "../../hooks/useFetching";
import ItemService from "../../API/ItemService";
import {usePaginate} from "../../hooks/usePaginate";
import MainLoader from "../UI/loader/MainLoader";
import OpacityErrorDiv from "../structureComponents/OpacityErrorDiv";
import {useError} from "../../hooks/useLoadingAndError";

function CollectionItemPostList({username, idCollection, type}) {

    const [items, setItems] = useState([])
    const [error, setError] = useState("")

    const [itemsFetch, isLoadingItems, errorItems] = useFetching( async () => {
        let response;
        if (type === "COLLECTION")
            response = await ItemService.getAllItemsByCollection(idCollection, pageNumber)
        else if (type === "USER")
            response = await ItemService.getAllItemsByUser(username, pageNumber)
        else if (type === "FOLLOWER")
            response = await ItemService.getAllItemsByFollower(username, pageNumber)
        else if (type === "MAIN")
            response = await ItemService.getAllMainItems("notAuth", pageNumber)

        if (response.length === 0)
            setCanLoad(false)
        else
            setItems(prev => [...prev, ...response])
    })

    useError(errorItems, setError)

    const [pageNumber, triggerElement, setCanLoad, clearData, canLoad] = usePaginate(itemsFetch, isLoadingItems)

    useEffect(() => {
        setItems([])
        clearData()
    }, [username, idCollection, type])


    if (isLoadingItems && canLoad)
        return <MainLoader />

    else if (type === "FOLLOWER" && items.length <= 0) {
        return (
            <div style={{display: "none"}}>
                {triggerElement}
            </div>
        )
    }
    else return (
        <div className={style.divList}>

            <OpacityErrorDiv error={error} setError={setError} />

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
                                username={c.author}
                                countId={c.countId}
                                collectionId={idCollection ? idCollection : c.collectionId}
                                type={type}
                            />
                        )}
                </>
                : <div className={style.notFound}> No collection items yet </div>
            }
            {triggerElement}
        </div>
    );

}

export default CollectionItemPostList;
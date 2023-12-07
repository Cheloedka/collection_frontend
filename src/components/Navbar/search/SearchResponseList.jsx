import style from "./SearchResponseList.module.css"
import {Link} from "react-router-dom";
import {getCollectionImage, getUserImage} from "../../../functions/imageFunctions";
import MDiv from "../../UI/div/MDiv";
import {useEffect, useState} from "react";
import SearchService from "../../../API/SearchService";
import SearchResponseListObserver from "./SearchResponseListObserver";

function SearchResponseList({data, setData, searchValue, type, setError, setIsLoading, countItems, isLoadingNewRequest, setModal}) {

    const isFound = data.length > 0
    const [isShowMore, setIsShowMore] = useState(false)
    const [canLoad, setCanLoad] = useState(true)


    useEffect(() => {
        if (isShowMore && isLoadingNewRequest) {
            setIsShowMore(false)
            setCanLoad(true)
        }
    }, [isLoadingNewRequest])

    async function searchFunction(pageNumber) {
        setIsLoading(true)

        let func
        if (type === "COLLECTION")
            func = async () => SearchService.searchCollections(searchValue, pageNumber)
        else if (type === "USER")
            func = async () => SearchService.searchUsers(searchValue, pageNumber)

        const responseData = await func()
            .finally(() => setIsLoading(false))

        if (responseData.length > 0) {
            if (data.length === 4)
                setData(responseData)
            else
                setData(prev => [...prev, ...responseData])
        }
        if ((countItems - pageNumber * 4 ) <= 0) {
            setCanLoad(false)
        }
    }

    return (
        <div className={style.listMain}>
            <div className={style.itemListTitle}>
                { type === "USER"
                    ? isFound ?  countItems + " users found: " : "Users not found"
                    : isFound ?  countItems + " collections found:" : "Collections not found"
                }
            </div>

            <div className={style.itemList}>
                { data.map((element, index) =>
                    <Link
                        to={"/" + element.idName}
                        key={index}
                        onClick={() => {
                            setModal(false)
                        }}
                    >
                        <MDiv className={style.item}>
                                <img alt="" className={style.imgUser}
                                     src={type === "USER" ? getUserImage(element.image) : getCollectionImage(element.image)}
                                />
                                <div>
                                    { type === "USER" ?
                                        <>
                                            <div className={style.itemTitle1}>
                                                {element.idName}
                                            </div>
                                            <div className={style.itemTitle2}>
                                                {element.title}
                                            </div>
                                        </>
                                        :<></>
                                    }
                                    { type === "COLLECTION" ?
                                        <>
                                            <div className={style.itemTitle1}>
                                                {element.title}
                                            </div>
                                            <div className={style.itemTitle2}>
                                                {element.idName.substring(0, element.idName.lastIndexOf("/"))}
                                            </div>
                                        </>
                                        :<></>
                                    }

                                </div>
                        </MDiv>
                    </Link>
                )}
            </div>

            { isShowMore && canLoad ?
                <SearchResponseListObserver
                    searchFunction={searchFunction}
                    setError={setError}
                    setIsLoading={setIsLoading}
                />
                : <></>
            }

            { ((countItems - data.length) >= 0) && !isShowMore ?
                <div className={style.showMoreBtnDiv}>
                    <div className={style.showMoreBtn} onClick={() => setIsShowMore(true)}>
                        Show more...
                    </div>
                </div>
                : <></> }
        </div>
    );
}

export default SearchResponseList;
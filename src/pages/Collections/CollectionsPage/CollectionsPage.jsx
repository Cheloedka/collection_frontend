import React, {useEffect, useMemo, useState} from 'react';
import style from './CollectionsPage.module.css'
import {useParams} from "react-router-dom";
import CollectionItemsList from "./CollectionItemsList";
import {useFetching} from "../../../hooks/useFetching";
import CollectionService from "../../../API/CollectionService";
import MainLoader from "../../../components/UI/loader/MainLoader";
import MainMessage from "../../../components/UI/message/MainMessage";
import PlusButton from "../../../components/UI/button/PlusButton";
import MDivWithSpans from "../../../components/UI/div/MDivWithSpans";
import MInputSearchNav from "../../../components/Navbar/search/MInputSearchNav";
import MDropdown from "../../../components/UI/dropdown/MDropdown";

function CollectionsPage() {
    const params = useParams()

    const [collections, setCollections] = useState([])

    const [collectionsPageFetch, isLoading, error] = useFetching(async () => {
        let response = await CollectionService.getAllCollections(params.username)
        setCollections(response)
    })

    useEffect(() => {
        collectionsPageFetch()
    }, [params.username])


    const [sortCollections, setSortCollections] = useState("")
    const [searchCollections, setSearchCollections] = useState("")


    const sortedCollections = useMemo(() => {
        if(sortCollections) {
            if (collections[1][sortCollections] > -1)
                return [...collections].sort((a, b) => b[sortCollections] - a[sortCollections] )

            return [...collections].sort((a, b) => a[sortCollections].localeCompare(b[sortCollections]) )
        }
        return collections

    }, [sortCollections, collections])


    const sortedAndSearchedCollections = useMemo(() => {
        return sortedCollections.filter(c => c.name.toLowerCase().includes(searchCollections.toLowerCase()))

    }, [sortedCollections, searchCollections])

    function collectionsSort(sort) {
        setSortCollections(sort)
    }

    const options = [
        {title: "Private First", type: "collectionPrivate", onClick: collectionsSort},
        {title: "Name A-Z", type: "name", onClick: collectionsSort},
        {title: "Count Items", type: "countItems", onClick: collectionsSort},
    ]

    return (
        <div>
            <MDivWithSpans
                mainText={"Collections"}
                secondText={collections.length}
                childrenCloseToText={
                <>
                    <div>
                        <MInputSearchNav
                            className={style.search}
                            value={searchCollections}
                            setValue={setSearchCollections}
                        />
                    </div>
                    <div className={style.divFilterAndAdd}>
                        { collections.length > 2 ?
                            <MDropdown
                                defaultValue={"Sorting By"}
                                options={options}
                            />
                            :<></>
                        }
                        <PlusButton to={'/collections/create'} />
                    </div>
                </>
                }
                className={style.divMain}
            >
            </MDivWithSpans>


            { isLoading
                ? <MainLoader />
                : <CollectionItemsList collections={sortedAndSearchedCollections}/>
            }

            {!isLoading ?
                <MainMessage
                    type="error"
                    text={error}
                />
                :<></>
            }
        </div>
    );
}

export default CollectionsPage;
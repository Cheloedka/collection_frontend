import React, {useEffect, useState} from 'react';
import style from './CollectionsPage.module.css'
import {useNavigate, useParams} from "react-router-dom";
import CollectionItemsList from "./CollectionItemsList";
import {useFetching} from "../../../hooks/useFetching";
import CollectionService from "../../../API/CollectionService";
import MainLoader from "../../../components/UI/loader/MainLoader";
import MainMessage from "../../../components/UI/message/MainMessage";

function CollectionsPage() {
    const params = useParams()
    const navigate = useNavigate()

    const [collections, setCollections] = useState([])

    const [collectionsPageFetch, isLoading, error] = useFetching(async () => {
        let response = await CollectionService.getAllCollections(params.username)
        setCollections(response)
    })

    useEffect(() => {
        collectionsPageFetch()
    }, [params.username])

    return (
        <div>
            <div>
                Collections
            </div>
            <button
                className={style.buttonAddCollection}
                onClick={() => navigate('/collections/create')}
            >
                +
            </button>
            { isLoading
                ? <MainLoader />
                : <CollectionItemsList username={params.username} collections={collections}/>
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
import React, {useEffect, useState} from 'react';
import style from "./RightDivsBlock.module.css";
import RightInfo from "./RightInfo";
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../../../hooks/useFetching";
import CollectionService from "../../../../API/CollectionService";
import {getCollectionImage, getUserImage} from "../../../../functions/imageFunctions";
import MainLoader from "../../../../components/UI/loader/MainLoader";

function RightDivsBlock({topRef, link}) {

    const params = useParams()

    const navigate = useNavigate()

    const [collection, setCollection] = useState({})
    const [collectionUser, setCollectionUser] = useState({})

    const [rightDivFetch, isLoading, error] = useFetching( async () => {
        const request = await CollectionService.getRightInfo(params.idCollection)
        setCollection({
            name: request.nameCollection,
            about: request.aboutCollection,
            image: getCollectionImage(request.imageCollection)
        })
        setCollectionUser({
            name: request.firstName,
            surname: request.surname,
            image: getUserImage(request.userImage)
        })
    })

    useEffect(() => {
        rightDivFetch()
    },[params.idCollection, params.idItem])


    const focusDiv = () => {              //scroll to top page useRef
        window.scrollTo({
            top: topRef.current.offsetTop
        });
    }

    function linkTo() {
        navigate(link)
    }

    if (collection)
        return (
            <div className={style.divRightInfo}>
                <RightInfo
                    image={collectionUser.image}
                    text1={params.username}
                    text2={collectionUser.name + " " + collectionUser.surname}
                    onClick={() => {navigate("/" + params.username)}}
                />
                <RightInfo
                    image={collection.image}
                    text1={collection.name}
                    text2={collection.about}
                    onClick={() => topRef ?focusDiv() :linkTo()}  /*scroll to top page useRef*/
                />
            </div>
        );
    else
       return <MainLoader />
}

export default RightDivsBlock;
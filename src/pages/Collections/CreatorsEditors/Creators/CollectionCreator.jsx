import React, {useContext, useEffect, useState} from 'react';
import {useFetching} from "../../../../hooks/useFetching";
import CollectionService from "../../../../API/CollectionService";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../../../context";
import CollectionBody from "../CollectionBody";

function CollectionCreator() {
    const navigate = useNavigate()
    const {username} = useContext(UserContext)

    const [title, setTitle] = useState("")
    const [about, setAbout] = useState("")
    const [information, setInformation] = useState("")
    const [isPrivate, setIsPrivate] = useState(false)

    const [backImage, setBackImage] = useState()
    const [mainImage, setMainImage] = useState()

    const [errorMessage, setErrorMessage] = useState('')

    const [fetchCollection, isLoading, collectionError] = useFetching(async () => {
        let data = {
            name: title,
            about: about,
            information: information,
            isPrivate: isPrivate
        }
        if (mainImage)
            data = {...data, image: mainImage}
        if (backImage)
            data = {...data, backgroundImage: backImage}

        await CollectionService.createCollection(data)
        navigate('/' + username + '/collections')
    })


    useEffect(() => {
        setErrorMessage(collectionError)
    },[collectionError])

    function declareCollectionData(e) {
        e.preventDefault()
        if (title === "" || about === "") {
            if (title === "")
                setErrorMessage("Title can't be empty")
            else
                setErrorMessage("About can't be empty")
        }
        else {
            fetchCollection()
        }
    }

    return (
        <CollectionBody
            declareCollectionData={declareCollectionData}

            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}

            title={title}
            setTitle={setTitle}

            about={about}
            setAbout={setAbout}

            information={information}
            setInformation={setInformation}

            mainImage={mainImage ? URL.createObjectURL(mainImage) : null}
            setMainImage={setMainImage}

            backImage={backImage ? URL.createObjectURL(backImage) : null}
            setBackImage={setBackImage}

            isPrivate={isPrivate}
            setIsPrivate={setIsPrivate}

            isLoading={isLoading}
        />
    );
}

export default CollectionCreator;
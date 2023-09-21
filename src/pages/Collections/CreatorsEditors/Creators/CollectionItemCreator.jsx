import React, {useEffect, useState} from 'react';
import {useFetching} from "../../../../hooks/useFetching";
import {useNavigate, useParams} from "react-router-dom";
import ItemService from "../../../../API/ItemService";
import useIsCurrentUser from "../../../../hooks/useIsCurrentUser";
import CollectionItemBody from "../CollectionItemBody";

function CollectionItemCreator() {
    const params = useParams()
    const navigate = useNavigate()
    const isUser = useIsCurrentUser()


    const [title, setTitle] = useState("")
    const [about, setAbout] = useState("")
    const [information, setInformation] = useState("")
    const [images, setImages] = useState([])
    const [image, setImage] = useState()


    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState(false)

    const [fetchItem, isLoading, error] = useFetching(async () => {
        const data = {
            name: title,
            about: about,
            information: information,
            idCollection: params.idCollection
        }

        await ItemService.newItem(data, images)
        navigate("/" + params.username + "/" + params.idCollection)
    })

    useEffect(() => {
        if (!isUser && isUser != null)
            navigate("/error")
    }, [isUser])



    function declareItemData(e) {
        e.preventDefault()
        if (title === "" || about === "") {
            if (title === "")
                setErrorMessage("Title can't be empty")
            else
                setErrorMessage("About can't be empty")
            setShowError(true)
        }
        else {
            fetchItem()
        }
    }

    return (
        <CollectionItemBody
            declareItemData={declareItemData}

            title={title}
            setTitle={setTitle}

            about={about}
            setAbout={setAbout}

            information={information}
            setInformation={setInformation}

            images={images}
            setImages={setImages}

            image={image}
            setImage={setImage}

            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}

            showError={showError}
            setShowError={setShowError}

            isLoading={isLoading}
            error={error}
        />
    );
}

export default CollectionItemCreator;
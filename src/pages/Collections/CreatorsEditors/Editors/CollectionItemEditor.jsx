import React, {useEffect, useState} from 'react';
import CollectionItemBody from "../CollectionItemBody";
import {useFetching} from "../../../../hooks/useFetching";
import ItemService from "../../../../API/ItemService";
import MainLoader from "../../../../components/UI/loader/MainLoader";
import useIsCurrentUser from "../../../../hooks/useIsCurrentUser";
import {useNavigate, useParams} from "react-router-dom";


function CollectionItemEditor() {
    const isUser = useIsCurrentUser()
    const navigate = useNavigate()
    const params = useParams()

    const [title, setTitle] = useState("")
    const [about, setAbout] = useState("")
    const [information, setInformation] = useState("")
    const [oldImages, setOldImages] = useState([])
    const [newImages, setNewImages] = useState([])
    const [image, setImage] = useState()

    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState(false)

    const [originalData, setOriginalData] = useState({})

    const [getItemInfo, isLoadingGet, errorGet] = useFetching(async () => {
        const request = await ItemService.getItemForEditor(params.idCollection, params.idItem)
        setOriginalData(request)
        setTitle(request.name)
        setAbout(request.about)
        setInformation(request.information)
        setOldImages(request.images)
    })

    const [fetchEditCollection, isLoading, error] = useFetching(async () => {
        let sendData = {}
        if (title !== originalData.name)
            sendData.name = title
        if (about !== originalData.about)
            sendData.about = about
        if (information !== "" && information !== originalData.information)
            sendData.information = information
        sendData.idCollection = params.idCollection
        sendData.countId = params.idItem

        await ItemService.editItem(sendData, oldImages, newImages)

        navigate('/' + params.username + '/' + params.idCollection + "/" + params.idItem)
    })


    useEffect(() => {
        if (!isUser && isUser != null)
            navigate("/error")
    }, [isUser])

    useEffect(() => {
        if (errorGet)
            navigate("/error")
    }, [errorGet])

    useEffect(() => {
        getItemInfo()
    },[params.idItem])


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
            fetchEditCollection()
        }
    }

    if (originalData)
        return (
            <CollectionItemBody
                declareItemData={declareItemData}

                title={title}
                setTitle={setTitle}

                about={about}
                setAbout={setAbout}

                information={information}
                setInformation={setInformation}

                images={newImages}
                setImages={setNewImages}

                oldImages={oldImages}
                setOldImages={setOldImages}

                image={image}
                setImage={setImage}

                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}

                showError={showError}
                setShowError={setShowError}

                isLoading={isLoading}
                error={error}
                isEdit={true}
            />
        );
    else
        return <MainLoader />

}

export default CollectionItemEditor;
import { useEffect, useState} from 'react';
import CollectionBody from "../CollectionBody";
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../../../hooks/useFetching";
import MainLoader from "../../../../components/UI/loader/MainLoader";
import CollectionService from "../../../../API/CollectionService";
import {getCollectionImage, getImage} from "../../../../functions/imageFunctions";

function CollectionEditor() {
    const navigate = useNavigate()
    const params = useParams()

    const [tittle, setTittle] = useState("")
    const [about, setAbout] = useState("")
    const [information, setInformation] = useState("")
    const [isPrivate, setIsPrivate] = useState(false)

    const [backImage, setBackImage] = useState()
    const [mainImage, setMainImage] = useState()

    const [errorMessage, setErrorMessage] = useState('')

    const [returnedData, setReturnedData] = useState({})

    const [images, setImages] = useState({})


    const [fetchCollectionData, isLoadingData, errorData] = useFetching(async () => {
        const response = await CollectionService.getCollection(params.idCollection, params.username)
        setReturnedData(response)
        setTittle(response.name)
        setAbout(response.about)
        setInformation(response.information)
        setIsPrivate(response.private)
        setImages({main: getCollectionImage(response.image), background: getImage(response.backgroundImage)})
    })


    const [fetchCollection, isLoading, error] = useFetching(async () => {
        let requestData = {}
        if (tittle !== returnedData.name)
            requestData.name = tittle
        if (about !== returnedData.about)
            requestData.about = about
        if (information !== "" && information !== returnedData.information)
            requestData.information = information
        if (mainImage)
            requestData = {...requestData, image: mainImage}
        if (backImage)
            requestData = {...requestData, backgroundImage: backImage}
        requestData.isPrivate = isPrivate

        await CollectionService.editCollection(params.idCollection, requestData)

        navigate('/' + params.username + '/' + params.idCollection)
    })

    useEffect(() => {
        if (errorData) {
            navigate("/error")
        }
    }, [errorData])


    useEffect(() => {
        setErrorMessage(error)
    },[error])

    useEffect(() => {
        fetchCollectionData()
    },[params.idCollection])

    useEffect(() => {
        if (mainImage)
            setImages(prev => ({...prev, main: URL.createObjectURL(mainImage)}))
    }, [mainImage])

    useEffect(() => {
        if (backImage)
            setImages(prev => ({...prev, background: URL.createObjectURL(backImage)}))
    }, [backImage])


    function declareCollection(e) {
        e.preventDefault()
        if (tittle === "")
            setErrorMessage("Title can't be empty")
        else if (about === "")
            setErrorMessage("About can't be empty")
        else if (
            tittle === returnedData.name &&
            about === returnedData.about &&
            information === returnedData.information &&
            isPrivate === returnedData.private &&
            !mainImage &&
            !backImage
        )  {
            setErrorMessage("Nothing Is Changed")
        }
        else {
            fetchCollection()
        }
    }


    return (
        <>
            {isLoadingData ?
                <MainLoader />
                :
                <CollectionBody
                    declareCollectionData={declareCollection}

                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}

                    tittle={tittle}
                    setTittle={setTittle}

                    about={about}
                    setAbout={setAbout}

                    information={information}
                    setInformation={setInformation}

                    mainImage={images.main}
                    setMainImage={setMainImage}

                    backImage={images.background}
                    setBackImage={setBackImage}

                    isPrivate={isPrivate}
                    setIsPrivate={setIsPrivate}

                    isLoading={isLoading}
                    isEdit={true}
                />
            }
        </>
    );
}

export default CollectionEditor;
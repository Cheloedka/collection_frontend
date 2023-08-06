import React, {useContext, useEffect, useState} from 'react';
import MDiv from "../../components/UI/div/MDiv";
import style from './CollectionCreator.module.css';
import Banner from "../../components/UI/div/Banner";
import BannerInfo from "../../components/UI/div/BannerInfo";
import MInput from "../../components/UI/input/MInput";
import M1Button from "../../components/UI/button/M1Button";
import MTextarea from "../../components/UI/input/MTextarea";
import Tag from "../../components/UI/div/Tag";
import MCheckbox from "../../components/UI/input/MCheckbox";
import {useFetching} from "../../hooks/useFetching";
import CollectionService from "../../API/CollectionService";
import MainLoader from "../../components/UI/loader/MainLoader";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../context";
import {Alert} from "react-bootstrap";

function CollectionCreator() {
    const navigate = useNavigate()
    const {username} = useContext(UserContext)

    const [title, setTittle] = useState("")
    const [about, setAbout] = useState("")
    const [information, setInformation] = useState("")
    const [isPrivate, setIsPrivate] = useState(false)

    const [backImage, setBackImage] = useState()
    const [mainImage, setMainImage] = useState()

    const [errorMessage, setErrorMessage] = useState('')

    const [collectionData, setCollectionData] = useState({})

    const [fetchCollection, isLoading, collectionError] = useFetching(async () => {
        await CollectionService.createCollection(collectionData)
        navigate('/' + username + '/collections')
    })

    function declareCollectionData(e) {
        e.preventDefault()

        if (title === "" || about === "") {
            if (title === "")
                setErrorMessage("Title can't be empty")
            else
                setErrorMessage("About can't be empty")
        }
        else {
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
            setCollectionData(data)
        }
    }

    useEffect(() => {
        setErrorMessage(collectionError)
    },[collectionError])

    useEffect(() => {
        if (title !== "" && about !== "")
            fetchCollection()
    },[collectionData])


    return (
        <MDiv className={style.MDiv}>
            <h3>
                Collection Creator
            </h3>
            <div>On this page you can create your collection</div>
            <form onSubmit={declareCollectionData}>
                <Banner
                    isUser={true}
                    setErrorMessage={setErrorMessage}
                    mainImage={mainImage ? URL.createObjectURL(mainImage) : null}
                    setMainImage={setMainImage}
                    backImage={backImage ? URL.createObjectURL(backImage) : null}
                    setBackImage={setBackImage}
                    isEdit={true}
                >
                    <div className={style.divCollectionContent}>
                        <BannerInfo tittle={title} secondText={about} themes={'dark'}/>

                        <div className={style.divInfoContent}>
                            {information}
                        </div>
                        <div className={style.divTagsContent}>
                            {isPrivate === true
                                ?<Tag>Private</Tag>
                                :<Tag color={'green'}>Public</Tag>
                            }
                        </div>
                    </div>
                </Banner>
                <div className={style.divAllInputs}>
                    <div className={style.divInputs}>
                        <MInput
                            type="name" value={title} onChange={event => setTittle(event.target.value)}
                            placeholder="Tittle" maxLength = "25"
                        />
                        <MInput type="name" value={about} onChange={event => setAbout(event.target.value)}
                                placeholder="About" maxLength = "50"
                        />
                    </div>
                    <div className={style.divInputs}>
                        <MTextarea value={information} onChange={event => setInformation(event.target.value)} placeholder="Info" maxLength = "500"/>
                    </div>
                    <div className={style.divSelect}>
                        <MCheckbox span={'Private'} checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)}/>
                        <M1Button>
                            {isLoading
                                ?<MainLoader/>
                                :<>Create </>
                            }

                        </M1Button>
                    </div>
                </div>
            </form>
            <div>
                {errorMessage
                    ? <Alert className="alert-danger"><strong>Error: </strong>{errorMessage}</Alert>
                    : <></>
                }
            </div>
        </MDiv>
    );
}

export default CollectionCreator;
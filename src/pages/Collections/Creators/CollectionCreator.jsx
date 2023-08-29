import React, {useContext, useEffect, useState} from 'react';
import MDiv from "../../../components/UI/div/MDiv";
import style from './CollectionCreator.module.css';
import Banner from "../../../components/UI/div/Banner";
import BannerInfo from "../../../components/UI/div/BannerInfo";
import M1Button from "../../../components/UI/button/M1Button";
import Tag from "../../../components/UI/div/Tag";
import MCheckbox from "../../../components/UI/input/MCheckbox";
import {useFetching} from "../../../hooks/useFetching";
import CollectionService from "../../../API/CollectionService";
import MainLoader from "../../../components/UI/loader/MainLoader";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../../context";
import MainMessage from "../../../components/UI/message/MainMessage";
import CreationInputs from "./CreationInputs";

function CollectionCreator() {
    const navigate = useNavigate()
    const {username} = useContext(UserContext)

    const [tittle, setTittle] = useState("")
    const [about, setAbout] = useState("")
    const [information, setInformation] = useState("")
    const [isPrivate, setIsPrivate] = useState(false)

    const [backImage, setBackImage] = useState()
    const [mainImage, setMainImage] = useState()

    const [errorMessage, setErrorMessage] = useState('')

    const [fetchCollection, isLoading, collectionError] = useFetching(async () => {
        let data = {
            name: tittle,
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
        if (tittle === "" || about === "") {
            if (tittle === "")
                setErrorMessage("Title can't be empty")
            else
                setErrorMessage("About can't be empty")
        }
        else {
            fetchCollection()
        }
    }

    return (
        <MDiv className={style.MDiv}>
            <div className={style.marginDiv}>
                <h3>Collection Creator</h3>
                <p>On this page you can create your collection</p>

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
                            <BannerInfo tittle={tittle} secondText={about} themes={'dark'}/>

                            <div className={style.divInfoContent}>
                                {information}
                            </div>
                            <div className={style.divTagsContent}>
                                { isPrivate
                                    ? <Tag>Private</Tag>
                                    : <Tag color={'green'}>Public</Tag>
                                }
                            </div>
                        </div>
                    </Banner>


                    <CreationInputs
                        tittle={tittle}
                        setTitle={setTittle}
                        about={about}
                        setAbout={setAbout}
                        information={information}
                        setInformation={setInformation}
                    >
                        <div className={style.divSelect}>
                            <MCheckbox
                                span={'Private'}
                                checked={isPrivate}
                                onChange={() => setIsPrivate(!isPrivate)}
                            />
                            <M1Button>
                                {isLoading
                                    ?<MainLoader/>
                                    :"Create"
                                }
                            </M1Button>

                        </div>
                    </CreationInputs>
                </form>

                <div>
                    { !isLoading ?
                        <MainMessage                  //if error
                            type="error"
                            text={errorMessage}
                        />
                        :<></>
                    }
                </div>
            </div>
        </MDiv>
    );
}

export default CollectionCreator;
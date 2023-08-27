import {useContext, useEffect, useState} from 'react';
import MDiv from "../../../components/UI/div/MDiv";
import style from './CollectionCreator.module.css';
import Banner from "../../../components/UI/div/Banner";
import BannerInfo from "../../../components/UI/div/BannerInfo";
import MInput from "../../../components/UI/input/MInput";
import M1Button from "../../../components/UI/button/M1Button";
import MTextarea from "../../../components/UI/input/MTextarea";
import Tag from "../../../components/UI/div/Tag";
import MCheckbox from "../../../components/UI/input/MCheckbox";
import {useFetching} from "../../../hooks/useFetching";
import CollectionService from "../../../API/CollectionService";
import MainLoader from "../../../components/UI/loader/MainLoader";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../../context";
import BooleanDiv from "../../../components/UI/div/BooleanDiv";
import MainMessage from "../../../components/UI/message/MainMessage";

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

    const inputs = [
        { value: title, onChange: setTittle, placeholder: "Tittle", maxLength: 25},
        { value: about, onChange: setAbout, placeholder: "About", maxLength: 50}
    ]

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
                            <BannerInfo tittle={title} secondText={about} themes={'dark'}/>

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

                    <div className={style.divAllInputs}>
                        <div className={style.divInputs}>
                            { inputs.map((c, index) =>
                                <MInput
                                    key={index}
                                    type="name"
                                    value={c.value}
                                    onChange={event => c.onChange(event.target.value)}
                                    placeholder={c.placeholder}
                                    maxLength = {c.maxLength}
                                />
                            )}
                        </div>

                        <div className={style.divInputs}>
                            <MTextarea
                                style={{minHeight: "136px"}}
                                value={information}
                                onChange={event => setInformation(event.target.value)}
                                placeholder="Info"
                                maxLength = "500"
                            />
                        </div>

                        <div className={style.divSelect}>
                            <MCheckbox
                                span={'Private'}
                                checked={isPrivate}
                                onChange={() => setIsPrivate(!isPrivate)}
                            />
                            <M1Button>
                                <BooleanDiv bool={isLoading} ifFalse="Create">
                                    <MainLoader/>
                                </BooleanDiv>
                            </M1Button>

                        </div>
                    </div>
                </form>

                <div>
                    <BooleanDiv bool={!isLoading}>
                        <MainMessage                  //if error
                            type="error"
                            text={errorMessage}
                        />
                    </BooleanDiv>
                </div>
            </div>
        </MDiv>
    );
}

export default CollectionCreator;
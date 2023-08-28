import React, {useEffect, useState} from 'react';
import style2 from "./CollectionCreator.module.css";
import style from "./CollectionItemCreator.module.css";
import M1Button from "../../../components/UI/button/M1Button";
import BooleanDiv from "../../../components/UI/div/BooleanDiv";
import MainLoader from "../../../components/UI/loader/MainLoader";
import MDiv from "../../../components/UI/div/MDiv";
import BannerInfo from "../../../components/UI/div/BannerInfo";
import CreationInputs from "./CreationInputs";
import img from "../../../images/fumo.jpg"
import MFileInput from "../../../components/UI/input/MFileInput";
import OpacityMessage from "../../../components/UI/message/OpacityMessage";

function CollectionItemCreator() {


    const [title, setTittle] = useState("")
    const [about, setAbout] = useState("")
    const [information, setInformation] = useState("")
    const [images, setImages] = useState([])
    const [image, setImage] = useState()


    const [errorMessage, setErrorMessage] = useState('')
    const [showError, setShowError] = useState('')


    useEffect(() => {
        if (images)
            setImage(images[0])
    }, [images])


    function removeFile(id) {
        setImages(prev => prev.filter((file, index) => id !== index))
    }

    return (
        <MDiv className={style2.MDiv}>
            <div className={style2.marginDiv}>
                <h3>Collection Item Creator</h3>
                <p>On this page you can create item in</p>   {/*collection Name*/}

                <div className={style.divItemContent}>
                    <img src={image ? URL.createObjectURL(image) : null} className={style.itemImage}/>

                    <div>
                        <BannerInfo
                            style={{marginLeft: "30px", marginTop: "20px", gap: "10px"}}
                            tittle={title}
                            secondText={about}
                            themes={'dark'}
                        />

                        <div
                            className={style2.divInfoContent}
                            style={{maxWidth: "800px"}}
                        >
                            {information}
                        </div>
                    </div>
                </div>
                <form /*onSubmit={}*/>
                    <CreationInputs
                        tittle={title}
                        setTitle={setTittle}
                        about={about}
                        setAbout={setAbout}
                        information={information}
                        setInformation={setInformation}
                    >
                        <div className={style2.divButton}>
                            <M1Button>

                                <BooleanDiv ifFalse="Create">
                                    <MainLoader/>
                                </BooleanDiv>

                            </M1Button>

                        </div>
                    </CreationInputs>

                    <h4>Images:</h4>
                    <div className={style.imagesAddDiv}>
                        <MFileInput
                            setImage={setImages}
                            maxSize={1}
                            maxFiles={10}
                            setError={setErrorMessage}
                            accept={"image/png, image/jpeg"}
                            setShowError={setShowError}
                        >
                            <div className={style.buttonAddImages}>
                                +
                            </div>
                        </MFileInput>

                        { images.map((element, index) =>
                            <div
                                key={index}
                                style={{position: "relative"}}
                            >
                                <div
                                    className={style.removeImageDiv}
                                    onClick={() => removeFile(index)}
                                >
                                    x
                                </div>
                                <img
                                    className={style.addedImg}
                                    src={URL.createObjectURL(element)}
                                    alt="item"
                                />
                            </div>
                            )}
                    </div>
                </form>

                <BooleanDiv bool={errorMessage}>
                    <OpacityMessage
                        type="error"
                        text={errorMessage}
                        setError={setErrorMessage}
                        setShowElement={setShowError}
                        showElement={showError}
                    />
                </BooleanDiv>
            </div>
        </MDiv>
    );
}

export default CollectionItemCreator;
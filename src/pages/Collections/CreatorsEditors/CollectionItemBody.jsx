import React, {useEffect} from 'react';
import MDiv from "../../../components/UI/div/MDiv";
import style2 from "./Creators/CollectionCreator.module.css";
import style from "./Creators/CollectionItemCreator.module.css";
import BannerInfo from "../../../components/banner/BannerInfo";
import CreationInputs from "./CreationInputs";
import M1Button from "../../../components/UI/button/M1Button";
import MainLoader from "../../../components/UI/loader/MainLoader";
import MFileInput from "../../../components/UI/input/MFileInput";
import OpacityMessage from "../../../components/UI/message/OpacityMessage";
import {getCollectionImage} from "../../../functions/imageFunctions";

function CollectionItemBody({declareItemData,
                                title, setTitle,
                                about, setAbout,
                                information, setInformation,
                                images, setImages,
                                image, setImage,
                                errorMessage, setErrorMessage,
                                showError, setShowError,
                                isLoading,
                                error,
                                isEdit,
                                oldImages, setOldImages
                            }) {

    useEffect(() => {
        if (isEdit && oldImages) {
            if (oldImages.length !== 0) {
                setImage(getCollectionImage(oldImages[0].name))
            }
            else if (images.length !== 0) {
                setImage(URL.createObjectURL(images[0]))
            }
            else {
                setImage("")
            }
        }
        else {
            if (images.length !== 0) {
                setImage(URL.createObjectURL(images[0]))
            }
            else {
                setImage("")
            }
        }
    }, [oldImages, images])


    useEffect(() => {
        setErrorMessage(error)
        setShowError(true)
    }, [error])


    function removeFile(id) {
        setImages(prev => prev.filter((file, index) => id !== index))
    }

    function removeOldFile(id) {
        setOldImages(prev => prev.filter((image, index) => id !== index))
    }

    return (
        <MDiv className={style2.MDiv}>
            <div className={style2.marginDiv}>
                { isEdit ?
                    <>
                        <h3>Collection Item Editor</h3>
                        <p>On this page you can change item in</p> {/* todo collection name*/}
                    </>
                    :
                    <>
                        <h3>Collection Item Creator</h3>
                        <p>On this page you can create item in</p> {/*todo collection name*/}
                    </>

                }

                <div className={style.divItemContent}>
                    <img src={image ? image : null} className={style.itemImage}/>

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
                <form onSubmit={declareItemData}>
                    <CreationInputs
                        tittle={title}
                        setTitle={setTitle}
                        about={about}
                        setAbout={setAbout}
                        information={information}
                        setInformation={setInformation}
                    >
                        <div className={style2.divButton}>
                            <M1Button>
                                {isLoading
                                    ? <MainLoader/>
                                    : <>{isEdit ? "Edit" : "Create"}</>
                                }
                            </M1Button>

                        </div>
                    </CreationInputs>

                    <h4>Images:</h4>
                    <div className={style.imagesAddDiv}>
                        <MFileInput
                            setImage={setImages}
                            maxSize={1}
                            maxFiles={oldImages ? 10 - oldImages.length : 10}
                            setError={setErrorMessage}
                            accept={"image/png, image/jpeg"}
                            setShowError={setShowError}
                        >
                            <div className={style.buttonAddImages}>
                                +
                            </div>
                        </MFileInput>

                        {isEdit ?
                            <>
                                {oldImages.length !== 0 ?
                                <>
                                    { oldImages.map((element, index) =>
                                        <div
                                            key={index}
                                            style={{position: "relative"}}
                                        >
                                            <div
                                                className={style.removeImageDiv}
                                                onClick={() => removeOldFile(index)}
                                            >
                                                x
                                            </div>
                                            <img
                                                className={style.addedImg}
                                                src={getCollectionImage(element.name)}
                                                alt="item"
                                            />
                                        </div>
                                    )}
                                </>
                                    :<></>
                                }
                            </>
                            :<></>
                        }

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

                {errorMessage && showError ?
                    <OpacityMessage
                        type="error"
                        text={errorMessage}
                        setError={setErrorMessage}
                        setShowElement={setShowError}
                        showElement={showError}
                    />
                    : <></>
                }

            </div>
        </MDiv>
    );
}

export default CollectionItemBody;
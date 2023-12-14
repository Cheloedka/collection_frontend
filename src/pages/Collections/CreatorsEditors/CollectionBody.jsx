import React from 'react';
import style from "./Creators/CollectionCreator.module.css";
import Banner from "../../../components/banner/Banner";
import BannerInfo from "../../../components/banner/BannerInfo";
import Tag from "../../../components/UI/div/Tag";
import CreationInputs from "./CreationInputs";
import MCheckbox from "../../../components/UI/input/MCheckbox";
import M1Button from "../../../components/UI/button/M1Button";
import MainLoader from "../../../components/UI/loader/MainLoader";
import MainMessage from "../../../components/UI/message/MainMessage";
import MDiv from "../../../components/UI/div/MDiv";

function CollectionBody({declareCollectionData,
                            errorMessage, setErrorMessage,
                            title, setTitle,
                            about, setAbout,
                            information, setInformation,
                            mainImage, setMainImage,
                            backImage, setBackImage,
                            isPrivate, setIsPrivate,
                            isLoading,
                            isEdit  //for edit
}) {

    return (
        <MDiv className={style.MDiv}>
            <div className={style.marginDiv}>
                { isEdit ?
                    <>
                        <h3>Collection Editor</h3>
                        <p>On this page you can change your collection</p>
                    </>
                    :
                    <>
                        <h3>Collection Creator</h3>
                        <p>On this page you can create your collection</p>
                    </>

                }


                <form onSubmit={declareCollectionData}>

                    <Banner
                        setErrorMessage={setErrorMessage}
                        mainImage={mainImage ? mainImage : null}
                        setMainImage={setMainImage}
                        backImage={backImage ? backImage : null}
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


                    <CreationInputs
                        tittle={title}
                        setTitle={setTitle}
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
                                    :
                                    <>
                                    { isEdit
                                        ? "Edit"
                                        : "Create"
                                    }
                                    </>
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

export default CollectionBody;
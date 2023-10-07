import {useState} from 'react';
import style from './Banner.module.css'
import editImgIco from "../../images/icons/Galleryedit.svg";
import MFileInput from "../UI/input/MFileInput";
import defaultCollectionImage from '../../images/imageNotFound.png'
import ImageModal from "../images/ImageModal";

function Banner({setErrorMessage, mainImage, setMainImage, backImage, setBackImage, children, isUser, imageType, isEdit}) {

    const [isOpened, setIsOpened] = useState(false)


    function coverContent() {
        if (backImage) {
            return <img src={backImage} className={style.backImg} />
        }
        else {
            if (!!isUser) {
                return <div className={style.editText}>
                    Change cover -->
                </div>
            }
        }
    }



    return (
        <div className={style.mainDiv}>
            <div className={style.divBackImg}>
                {coverContent()}
                <div className={style.divOpacity}>
                    { !!isUser
                        ?
                        <MFileInput
                            setImage={setBackImage}
                            maxSize={2}
                            setError={setErrorMessage}
                        >
                            <img
                                src={editImgIco}
                                className={style.editImg}
                                alt={"edit"}
                            />
                        </MFileInput>
                        : <></>
                    }
                </div>
                <div className={style.divContent}>
                        <img
                            src={ mainImage ? mainImage : defaultCollectionImage}
                            className={imageType === 'user' ? style.userImage : style.collectionImage}
                            alt="image"
                            onClick={() => setIsOpened(true)}
                        />
                        <ImageModal
                            isOpened={isOpened}
                            setIsOpened={setIsOpened}
                            src={ mainImage ? mainImage : defaultCollectionImage}
                        />

                        { isEdit === true
                            ?
                            <MFileInput
                                setImage={setMainImage}
                                maxSize={2}
                                setError={setErrorMessage}
                            >
                                <img
                                    src={editImgIco}
                                    className={style.editImg2}
                                    alt={"edit"}
                                />
                            </MFileInput>
                            : <></>
                        }
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Banner;
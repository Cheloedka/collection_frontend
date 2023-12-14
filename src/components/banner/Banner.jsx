import {useEffect, useState} from 'react';
import style from './Banner.module.css'
import editImgIco from "../../images/icons/Galleryedit.svg";
import MFileInput from "../UI/input/MFileInput";
import defaultCollectionImage from '../../images/imageNotFound.png'
import ImageModal from "../images/ImageModal";
import useIsCurrentUser from "../../hooks/useIsCurrentUser";
import {useFetching} from "../../hooks/useFetching";
import UserService from "../../API/UserService";
import {useParams} from "react-router-dom";
import OpacityMessage from "../UI/message/OpacityMessage";
import {useError} from "../../hooks/useLoadingAndError";
import CollectionService from "../../API/CollectionService";
import Tooltip from "../../components/UI/tooltip/Tooltip";

function Banner({setErrorMessage, mainImage, setMainImage, backImage, setBackImage, children, imageType, isEdit}) {
    const isUser = useIsCurrentUser()
    const params = useParams()
    const [isOpened, setIsOpened] = useState(false)

    const [back, setBack] = useState()
    const [error, setError] = useState("")
    const [showElement, setShowElement] = useState(false)

    const [backFetch, isLoading, backError] = useFetching( async () => {
        let response
        if (imageType === 'USER') {
            response = await UserService.changeBackImage(params.username, back)
        }
        else {
            response = await CollectionService.changeBackImage(params.idCollection, back)
        }
        setBackImage(response)
    })
    useError(backError, setError)

    useEffect(() => {
        if (error)
            setShowElement(true)
    }, [error])

    useEffect(() => {
        if (back)
            backFetch()
    }, [back])


    function coverContent() {
        if (backImage) {
            return <img alt="" src={backImage} className={style.backImg} />
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
                        <Tooltip text="Change cover" className={style.editTooltip}>
                            <MFileInput
                                setImage={isEdit ? setBackImage : setBack}
                                maxSize={2}
                                setError={isEdit ? setErrorMessage : setError}
                            >
                                <img
                                    src={editImgIco}
                                    className={style.editImg}
                                    alt={"edit"}
                                />
                            </MFileInput>
                        </Tooltip>
                        : <></>
                    }
                </div>
                <div className={style.divContent}>
                        <img
                        src={ mainImage ? mainImage : defaultCollectionImage}
                        className={imageType === 'USER' ? style.userImage : style.collectionImage}
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

                    <OpacityMessage
                        type="error"
                        text={error}
                        setError={setError}
                        showElement={showElement}
                        setShowElement={setShowElement}
                    />
                </div>
            </div>
        </div>
    );
}

export default Banner;
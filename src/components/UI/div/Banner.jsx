import React from 'react';
import style from './Banner.module.css'
import editImgIco from "../../../images/icons/Galleryedit.svg";
import MFileInput from "../input/MFileInput";

function Banner({setErrorMessage, mainImage, setMainImage, backImage, setBackImage, children, isUser, imageType, isEdit}) {


    function coverContent() {
        if (backImage) {
            return <img src={backImage} className={style.backImg} alt="background"/>
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
                    {!!isUser
                        ?
                        <MFileInput setImage={setBackImage} maxSize={2} setError={setErrorMessage}>
                            <img src={editImgIco} className={style.editImg}  alt={"edit"}/>
                        </MFileInput>
                        : <></>
                    }
                </div>
                <div className={style.divContent}>
                        <img
                            src={mainImage}
                            className={imageType === 'user' ? style.userImage : style.collectionImage}
                            alt="image"
                        />
                        :
                        <></>
                        {/*<div id="myModal" className="modal">
                            <span className="close">&times;</span>
                            <img className="modal-content" id="img01"/>
                        </div>*/}
                        {isEdit === true
                            ?
                            <MFileInput setImage={setMainImage} maxSize={1} setError={setErrorMessage}>
                                <img src={editImgIco} className={style.editImg2}  alt={"edit"}/>
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
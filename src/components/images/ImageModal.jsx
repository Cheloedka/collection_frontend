import React from 'react';
import MModal from "../UI/modal/MModal";
import style from "./ImagesModal.module.css"

function ImageModal({isOpened, setIsOpened, src}) {

    if (isOpened)
        return (
            <MModal
                visible={isOpened}
                setVisible={setIsOpened}
                className={style.modal}
            >
                <img className={style.image} src={src} alt="" />
            </MModal>
        );
    else return <></>
}

export default ImageModal;
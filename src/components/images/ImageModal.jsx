import React from 'react';
import MModal from "../UI/modal/MModal";
import style from "./ImagesModal.module.css"

function ImageModal({isOpened, setIsOpened, src}) {

    return (
        <MModal
            visible={isOpened}
            setVisible={setIsOpened}
            className={style.modal}
        >
            <img className={style.image} src={src} alt="" />
        </MModal>
    );
}

export default ImageModal;
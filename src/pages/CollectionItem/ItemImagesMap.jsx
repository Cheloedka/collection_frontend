import React, {useState} from 'react';
import style from "./ItemImagesMap.module.css";
import {getCollectionImage} from "../../functions/imageFunctions";
import ImageModal from "../../components/images/ImageModal";

function ItemImagesMap({images, defaultImage}) {

    const [image, setImage] = useState(defaultImage)
    const [nowId, setNowId] = useState(0)
    const [isOpened, setIsOpened] = useState(false)

    function setImageById(id) {
        setImage(() => images[id].name)
        setNowId(() => id)
    }

    return (
        <>
            <div className={style.imagesDiv}>
                {images
                    .map((c, index) =>
                        <div className={nowId === index ?style.imageDivActive :style.imageDiv}
                             key={index}
                             onClick={() => setImageById(index)}
                        >
                            <img className={style.imageSm} src={getCollectionImage(c.name)} alt={"something"}/>
                        </div>
                    )}
            </div>

            <img
                className={style.imageBg}
                src={getCollectionImage(image)}
                alt={"something"}
                onClick={() => setIsOpened(true)}
            />

            <ImageModal isOpened={isOpened} setIsOpened={setIsOpened} src={getCollectionImage(image)}/>

        </>
    );
}

export default ItemImagesMap;
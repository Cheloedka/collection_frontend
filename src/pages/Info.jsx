import React, {useState} from 'react';
import img from "../images/fumo.jpg"
import ImageModal from "../components/images/ImageModal";

function Info() {

    const [visible, setVisible] = useState(false)

    return (
        <div>
            <button onClick={() => setVisible(true)}>Show</button>


            <ImageModal isOpened={visible} setIsOpened={setVisible} src={img} />
        </div>
    );
}

export default Info;
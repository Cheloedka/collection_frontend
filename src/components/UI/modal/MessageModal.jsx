import {useNavigate} from "react-router-dom";
import {Modal} from "react-bootstrap";
import style from "./MessageModal.module.css"
import M2Button from "../button/M2Button";

function MessageModal({visible, setVisible, children, acceptCallback, to}) {

    const navigate = useNavigate()

    function onHide() {
        setVisible(false)
        if (to)
            navigate(to)
    }

    function onAccept() {
        acceptCallback()
        setVisible(false)
    }

    return (
        <Modal
            show={visible}
            onHide={onHide}
        >

            <div className={style.modalBody + " own_bg_colorHeader"}>

                <Modal.Body className="bg-transparent">
                    <span className={style.span}>
                        {children}
                    </span>

                    <M2Button
                        onClick={onHide}
                        style={{float: "right"}}
                        color={'red'}
                    >
                        Close
                    </M2Button>
                    {acceptCallback ?
                        <M2Button
                            onClick={onAccept}
                            style={{float: "right"}}
                        >
                            Accept
                        </M2Button>
                        :<></>
                    }
                </Modal.Body>


            </div>

        </Modal>
    );
}

export default MessageModal;
import style from "./MModal.module.css"
import {useStyles} from "../../../hooks/useStyles";
import {Modal} from "react-bootstrap";
import CloseButton from "../button/CloseButton";

function MModal({visible, setVisible, children, className}) {

    const classes = useStyles(style.main, className)

    return (
        <Modal
            show={visible}
            onHide={() => setVisible(false)}
            className={classes}
        >
            <div className={style.modal}>
                <CloseButton
                    className={style.cancel}
                    onClick={() => setVisible(false)}
                />
                <div>
                    {children}
                </div>
            </div>
        </Modal>
    );
}

export default MModal;
import {Alert} from "react-bootstrap";
import style from './OpacityMessage.module.css'
import {useState} from "react";
import {useInterval} from "usehooks-ts";

function OpacityMessage({type, text, showElement, setShowElement, setError, ...props}) {

    const [opacity, setOpacity] = useState(1)

    useInterval(() => {
        if (opacity > 0) {
            setOpacity(opacity - 0.02)
        }
        else {
            setShowElement(false)
            setError("")
            setOpacity(1)
        }

    }, showElement ? 100 : null)


    const classes = []
    const strongType = []
    const types = {
        success: "alert-success",
        error: "alert-danger",
        secondary: "alert-secondary"
    }
    const strong = {
        success: "Message: ",
        error: "Error: ",
    }

    classes.push(types[type] ?? types.secondary)
    strongType.push(strong[type] ?? strong.success)

    return (
        <>
            { showElement
                ? <div
                    className={style.message}
                    style={{opacity: opacity}}
                    {...props}
                >
                    <Alert className={classes}>
                        <strong>
                            {strongType}
                        </strong>
                        {text}
                    </Alert>
                </div>
                : <></>
            }
        </>
    );
}

export default OpacityMessage;
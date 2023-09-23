import {Alert} from "react-bootstrap";
import style from './OpacityMessage.module.css'
import {useEffect, useState} from "react";

function OpacityMessage({type, text, showElement, setShowElement, setError}) {

    const [opacity, setOpacity] = useState(1)

    useEffect(() => {
        if (showElement) {
            setOpacity(1)
            setTimeout(function() {
                setOpacity(prev => (prev - 0.2))
                setShowElement(false)
                setError("")
            }, 3000);
        }
    },[showElement])


    const classes = []
    const strongType = []
    const types = {
        success: "alert-success",
        error: "alert-danger",
        secondary: "alert-secondary"
    }
    const strong = {
        success: "OpacityMessage: ",
        error: "Error: ",
    }

    classes.push(types[type] ?? types.secondary)
    strongType.push(strong[type] ?? strong.success)

    return (
        <>
            { showElement ?
                <div
                    className={style.message}
                    style={{opacity: opacity}}
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
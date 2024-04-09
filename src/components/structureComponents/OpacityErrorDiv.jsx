import {useEffect, useState} from "react";
import OpacityMessage from "../UI/message/OpacityMessage";

function OpacityErrorDiv({error, setError}) {

    const [showElement, setShowElement] = useState(false)

    useEffect(() => {
        if (error)
            setShowElement(true)
    }, [error])

    return (
        <OpacityMessage
            type="error"
            text={error}
            setError={setError}
            showElement={showElement}
            setShowElement={setShowElement}
        />
    );
}

export default OpacityErrorDiv;
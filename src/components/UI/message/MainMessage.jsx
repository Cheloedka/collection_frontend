import React from 'react';
import {Alert} from "react-bootstrap";
import style from "./MainMessage.module.css"

function MainMessage({type, text}) {

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
        <div
            className={text ? style.message : style.displayNone}
        >
            <Alert className={classes}>
                <strong>
                    {strongType}
                </strong>
                {text}
            </Alert>
        </div>
    );
}

export default MainMessage;
import {useState} from 'react';
import M1Button from "../components/UI/button/M1Button";

function Info() {

    const obj = {
        title: "title",
        onClick: inf => console.log("worked " + inf)
    }

    return (
        <div>
            Info

            <M1Button onClick={() => {
                obj.onClick(obj.title)
            }}>
                Click me
            </M1Button>
        </div>
    );
}

export default Info;
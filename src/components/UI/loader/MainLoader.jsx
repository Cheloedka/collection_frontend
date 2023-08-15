import React from 'react';
import {BeatLoader} from "react-spinners";

function MainLoader({color}) {
    return (
        <BeatLoader
            color={color ?color :"FFFFFF"}
            size="10px"
            speedMultiplier="1"
        />
    );
}

export default MainLoader;
import React from 'react';
import {BeatLoader} from "react-spinners";

function MainLoader({isLoading, color, size}) {
    return (
        <div style={{textAlign:"center"}}>
            <BeatLoader
                loading={isLoading}
                color={color ? color : "#2e294c"}
                size={size ? size : "10px"}
                speedMultiplier="1"
            />
        </div>
    );
}

export default MainLoader;
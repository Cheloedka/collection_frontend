import React, {useContext} from 'react';
import {UserContext} from "../context";
import {useParams} from "react-router-dom";

function UseIsCurrentUser() {
    const {username} = useContext(UserContext)
    const params = useParams()

    return username ?username.toLowerCase() === params.username.toLowerCase() :null;

}

export default UseIsCurrentUser;
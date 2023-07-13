import React, {useContext, useEffect, useState} from "react";
import UserService from "../API/UserService";
import {AuthContext, UserContext} from "./index";
import {useFetching} from "../hooks/useFetching";
import {getUserImage} from "../functions/imageFunctions";

function UserContextProvider({children}) {
    const [username, setUsername] = useState("hwo")
    const [userImage, setUserImage] = useState()

    const {isAuth} = useContext(AuthContext)

    const [fetchUser, isLoading, errorUser] = useFetching(async () => {
        const response = await UserService.userNav()
        setUsername(response.username)
        setUserImage(getUserImage(response.image))
    })


    useEffect(() => {
        if (isAuth) {
            fetchUser()
        }
    }, [isAuth])

    return (
        <UserContext.Provider value={{
            username,
            setUsername,
            userImage,
            setUserImage,
            isLoading,
            errorUser
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
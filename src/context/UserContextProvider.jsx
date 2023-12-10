import React, {useContext, useEffect, useState} from "react";
import UserService from "../API/UserService";
import {AuthContext, UserContext} from "./index";
import {useFetching} from "../hooks/useFetching";
import {getUserImage} from "../functions/imageFunctions";

function UserContextProvider({children}) {
    const [username, setUsername] = useState("")
    const [userImage, setUserImage] = useState("")
    const [userOriginalImage, setUserOriginalImage] = useState("")
    const [countNotifications, setCountNotifications] = useState(0)

    const {isAuth} = useContext(AuthContext)

    const [fetchUser, isLoading, errorUser] = useFetching(async () => {
        const response = await UserService.userNav()
        setUsername(response.username)
        setUserImage(getUserImage(response.image))
        setUserOriginalImage(response.image)
        setCountNotifications(response.countNotif)
    })


    useEffect(() => {
        if (isAuth) {
            fetchUser()
        }
        if (errorUser)
            console.log(errorUser)
    }, [isAuth])

    return (
        <UserContext.Provider value={{
            username,
            setUsername,
            userImage,
            setUserImage,
            userOriginalImage,
            countNotifications,
            setCountNotifications,
            isLoading
        }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
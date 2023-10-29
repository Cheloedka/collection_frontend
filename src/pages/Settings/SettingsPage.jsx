import React, {useContext, useEffect, useState} from 'react';
import MDiv from "../../components/UI/div/MDiv";
import style from './SettingsPage.module.css'
import {UserContext} from "../../context";
import PaginationButtons from "../../components/UI/pagination/PaginationButtons";
import AccountSettings from "./Account/AccountSettings";
import SecuritySettings from "./Security/SecuritySettings";
import {useFetching} from "../../hooks/useFetching";
import MainLoader from "../../components/UI/loader/MainLoader";
import UserService from "../../API/UserService";
import MainMessage from "../../components/UI/message/MainMessage";

function SettingsPage() {
    const {username, userImage} = useContext(UserContext)

    const [page, setPage] = useState(0)
    const [data, setData] = useState()

    const[fetchUserInfo, isLoading, error] = useFetching(async () => {
        const response = await UserService.userSettingsInfo(username)
        setData(response)
    })

    useEffect(() => {
        if (username)
            fetchUserInfo()
    },[username])

    function contentPage() {
        if (data) {
            switch (page) {
                case 0:
                    return <AccountSettings
                        userFirstName={data.name}
                        setUserFirstName={newName => {
                            setData(prev => ({...prev, name: newName}))
                        }}
                        userSurname={data.surname}
                        setUserSurname={newSurname => {
                            setData(prev => ({...prev, surname: newSurname}))
                        }}
                    />

                case 1:
                    return <SecuritySettings
                        userEmail={data.email}
                        setUserEmail={newEmail => {
                            setData(prev => ({...prev, email: newEmail}))
                        }}
                    />

                case 2:
                    return <div>Profile</div>
            }
        }
        else
            return <MainLoader />
    }

    const buttons = [
        {title: "Account"},
        {title: "Security"},
        {title: "Profile"},
    ]

    return (
        <div className={style.Settings}>
            <MDiv className={style.MDiv}>
                <div className={style.divAccountContent}>
                    <img src={userImage} className={style.userImage} alt='userImage'/>
                    <div className={style.divAccountInfo}>
                        <div>{username}</div>
                        <div>Your personal account</div>
                    </div>
                    <PaginationButtons pageNumber={setPage} buttons={buttons}/>
                </div>

                <div className={style.divContent}>
                    { isLoading
                        ?<MainLoader />
                        :contentPage()
                    }
                </div>
                { !isLoading ?
                    <MainMessage                  //if error
                        type="error"
                        text={error}
                    />
                    :<></>
                }
            </MDiv>
        </div>
    );
}

export default SettingsPage;
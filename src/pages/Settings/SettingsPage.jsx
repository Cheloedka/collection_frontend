import {useContext, useEffect, useState} from 'react';
import MDiv from "../../components/UI/div/MDiv";
import style from './SettingsPage.module.css'
import {UserContext} from "../../context";
import SettingsNavButtons from "./SettingsNavButtons";
import AccountSettings from "./Account/AccountSettings";
import SecuritySettings from "./Security/SecuritySettings";
import {useFetching} from "../../hooks/useFetching";
import MainLoader from "../../components/UI/loader/MainLoader";
import {Alert} from "react-bootstrap";
import UserService from "../../API/UserService";

function SettingsPage() {
    const {username, userImage} = useContext(UserContext)

    const [page, setPage] = useState(1)

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
                case 1:
                    return <AccountSettings
                        userFirstName={data.name}
                        userSurname={data.surname}
                        setUserFirstName={newName => {
                            setData(prev => ({...prev, name: newName}))
                        }}
                        setUserSurname={newSurname => {
                            setData(prev => ({...prev, surname: newSurname}))
                        }}
                    />

                case 2:
                    return <SecuritySettings
                        userEmail={data.email}
                    />

                case 3:
                    return <div>Profile</div>
            }
        }
        else
            return <MainLoader />
    }


    return (
        <div className={style.Settings}>
            <MDiv className={style.MDiv}>
                <div className={style.divAccountContent}>
                    <img src={userImage} className={style.userImage} alt='userImage'/>
                    <div className={style.divAccountInfo}>
                        <div>{username}</div>
                        <div>Your personal account</div>
                    </div>
                    <SettingsNavButtons pageNumber={setPage}/>
                </div>

                <div className={style.divContent}>
                    { isLoading
                        ? <MainLoader />
                        : <>{contentPage()}</>
                    }

                </div>
                <div>
                    { error
                        ? <Alert className="alert-danger">
                            <strong>Error: </strong>
                            {error}
                        </Alert>
                        : <></>
                    }
                </div>
            </MDiv>
        </div>
    );
}

export default SettingsPage;
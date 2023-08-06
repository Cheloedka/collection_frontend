import React, {useContext, useState} from 'react';
import MDiv from "../../components/UI/div/MDiv";
import style from './SettingsPage.module.css'
import {UserContext} from "../../context";
import SettingsNavButtons from "./SettingsNavButtons";
import AccountSettings from "./Account/AccountSettings";
import SettingsEditButton from "../../components/UI/button/SettingsEditButton";

function SettingsPage() {
    const {username, userImage} = useContext(UserContext)


    const[page, setPage] = useState(1)


    function contentPage() {
        switch (page) {
            case 1:
                return <AccountSettings/>

            case 2:
                return <div>Security</div>

            case 3:
                return <div>Profile</div>
        }
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
                    {contentPage()}
                </div>

            </MDiv>
        </div>
    );
}

export default SettingsPage;
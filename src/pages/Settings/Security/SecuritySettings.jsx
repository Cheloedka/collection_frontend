import React, {useEffect, useState} from 'react';
import MInputWithText from "../../../components/UI/input/MInputWithText";
import style from "./SecuritySettings.module.css";
import SettingsEditButton from "../../../components/UI/button/SettingsEditButton";
import {useFetching} from "../../../hooks/useFetching";
import MainLoader from "../../../components/UI/loader/MainLoader";
import Edit from "../../../components/UI/svg/Edit";
import UserService from "../../../API/UserService";
import inputStyle from "../../../components/UI/input/MInputWithText.module.css"
import MainMessage from "../../../components/UI/message/MainMessage";
import {useLoadingAndError} from "../../../hooks/useLoadingAndError";

function SecuritySettings({userEmail, setUserEmail}) {

    const [isPasswordClosed, setIsPasswordClosed] = useState(false)
    const [isEmailClosed, setIsEmailClosed] = useState(false)

    const [email, setEmail] = useState(userEmail)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")


    const [fetchEmail, isEmailLoading, emailError] = useFetching(async () => {
        const response = await UserService.changeEmail({email: email})
        setUserEmail(email)
        setError("")
        setSuccessMessage(response)
        setIsEmailClosed(true)
    })

    useLoadingAndError(isEmailLoading, setIsLoading, emailError, setError)

    function changeEmail() {
        if (email === userEmail)
            setError("Nothing is changed")
        else if (email === "")
            setError("Email can't be empty")
        else
            fetchEmail()
        setIsEmailClosed(false)
    }

    const [fetchPassword, isLoadingPass, errorPass] = useFetching(async () => {
        const data = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        const response = await UserService.changePassword(data)
        setError("")
        setOldPassword("")
        setNewPassword("")
        setSuccessMessage(response)
        setIsPasswordClosed(true)
    })

    useLoadingAndError(isLoadingPass, setIsLoading, errorPass, setError)

    function changePassword() {
        if (newPassword === "")
            setError("Password can't be empty")
        else
            fetchPassword()
        setIsEmailClosed(false)
    }

    useEffect(() => {
        setSuccessMessage("")
    }, [error])

    return (
        <>
            <div className={style.divCenter}>

                <MInputWithText
                    type="email"
                    placeholder={"Change Email"}
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    onClose={() => setEmail(userEmail)}
                    isInputsClosed={isEmailClosed}
                    defaultValue={userEmail}
                >
                    <SettingsEditButton
                        text={"Change Email"}
                        onClick={() => {
                            setIsEmailClosed(false)
                            changeEmail()
                        }}
                    >
                        { isLoading ?
                            <MainLoader color='#3A325B' />
                            : <Edit color='#3A325B' />
                        }
                    </SettingsEditButton>
                </MInputWithText>


                <MInputWithText
                    type="password"
                    placeholder={"Change Password"}
                    value={oldPassword}
                    onChange={event => setOldPassword(event.target.value)}
                    onClose={() => {
                        setOldPassword("")
                        setNewPassword("")
                    }}
                    isInputsClosed={isPasswordClosed}
                    defaultValue={"******************"}
                >
                    <div className={inputStyle.divLabel}>
                        <label className={inputStyle.label}>
                            New Password
                        </label>
                    </div>
                    <input
                        type="password"
                        className={inputStyle.MInput + " form-control"}
                        value={newPassword}
                        onChange={event => setNewPassword(event.target.value)}
                    />
                    <SettingsEditButton
                        text={"Change Password"}
                        onClick={() => {
                            setIsPasswordClosed(false)
                            changePassword()
                        }}
                    >
                        { isLoading
                            ? <MainLoader color='#3A325B'/>
                            : <Edit color='#3A325B'/>
                        }
                    </SettingsEditButton>
                </MInputWithText>


            </div>
            <div className={style.saveChanges}>
                <button>
                    <SettingsEditButton
                        style={{borderColor: "red", color: "red"}}
                        text={"Delete Account"}
                    >

                    </SettingsEditButton>
                </button>
            </div>
            <div>
                <MainMessage
                    type="error"
                    text={error}
                />
                <MainMessage
                    type="success"
                    text={successMessage}
                />
            </div>
        </>
    );
}

export default SecuritySettings;
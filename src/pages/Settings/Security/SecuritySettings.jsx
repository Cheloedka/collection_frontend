import {useEffect, useState} from 'react';
import MInputWithText from "../../../components/UI/input/MInputWithText";
import style from "./SecuritySettings.module.css";
import SettingsEditButton from "../../../components/UI/button/SettingsEditButton";
import {useFetching} from "../../../hooks/useFetching";
import {Alert} from "react-bootstrap";
import MainLoader from "../../../components/UI/loader/MainLoader";
import Edit from "../../../components/UI/svg/Edit";
import UserService from "../../../API/UserService";
import {checkEmailFunction, checkTittleFunction} from "../../../functions/stringFunctions";
import inputStyle from "../../../components/UI/input/MInputWithText.module.css"

function SecuritySettings({userEmail, setUserEmail}) {


    const [isPasswordClosed, setIsPasswordClosed] = useState(false)
    const [isEmailClosed, setIsEmailClosed] = useState(false)

    const [email, setEmail] = useState(userEmail)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")


    const [fetchEmail, isLoading, error] = useFetching(async () => {
        const response = await UserService.changeEmail({email: email})
        setUserEmail(email)
        setSuccessMessage(response)
        setIsEmailClosed(true)
    })
    function changeEmail() {
        if (email === userEmail)
            setErrorMessage("Nothing is changed")
        else if (email === "")
            setErrorMessage("Email can't be empty")
        else
        if (checkTittleFunction(userEmail)) {
            fetchEmail()
        }
        else {
            setErrorMessage("Invalid email address")
        }
        setIsEmailClosed(false)
    }



    const [fetchPassword, isLoadingPass, errorPass] = useFetching(async () => {
        const data = {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
        const response = await UserService.changePassword(data)
        setErrorMessage("")
        setOldPassword("")
        setNewPassword("")
        setSuccessMessage(response)
        setIsPasswordClosed(true)
    })
    function changePassword() {
        if (newPassword === "")
            setErrorMessage("Password can't be empty") //todo add function change password
        else
            fetchPassword()
    }

    useEffect(() => {
        setErrorMessage(error)
    },[error])

    useEffect(() => {
        setErrorMessage(errorPass)
    },[errorPass])

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
                        { isLoading
                            ? <MainLoader color='#3A325B' />
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
                        <label className={inputStyle.label}>New Password</label>
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
                        { isLoadingPass
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
                { errorMessage  ?
                    <Alert className="alert-danger">
                        <strong>Error: </strong>
                        {errorMessage}
                    </Alert>
                    : <></>
                }
                { successMessage ?
                    <Alert className="alert-success">
                        <strong> Message: </strong>
                        {successMessage}
                    </Alert>
                    : <></>
                }
            </div>
        </>
    );
}

export default SecuritySettings;
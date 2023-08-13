import {useState} from 'react';
import MInputWithText from "../../../components/UI/input/MInputWithText";
import style from "./SecuritySettings.module.css";
import SettingsEditButton from "../../../components/UI/button/SettingsEditButton";
import {useFetching} from "../../../hooks/useFetching";
import {Alert} from "react-bootstrap";
import MainLoader from "../../../components/UI/loader/MainLoader";
import Edit from "../../../components/UI/svg/Edit";
import MInput from "../../../components/UI/input/MInput";

function SecuritySettings({userEmail}) {


    const [isInputsClosed, setIsInputsClosed] = useState(false)
    const [email, setEmail] = useState(userEmail)
    const [oldPassword, setOldPassword] = useState("******************")
    const [newPassword, setNewPassword] = useState("")

    const data = {}


    const [fetchSecurity, isLoading, error] = useFetching(async () => {

    })


    function declareUserData(value) {
        data.value = value
        fetchSecurity()
        setIsInputsClosed(false)
    }


    return (
        <>
            <div className={style.divCenter}>

                <MInputWithText
                    type="name"
                    placeholder={"Change Email"}
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    onClose={() => setEmail(userEmail)}
                    isInputsClosed={isInputsClosed}
                    defaultValue={userEmail}
                >
                    <SettingsEditButton
                        text={"Change Email"}
                        onClick={() => {
                            setIsInputsClosed(true)
                        }}
                    >
                        { isLoading
                            ? <MainLoader />
                            : <><Edit color='#3A325B'/></>
                        }
                    </SettingsEditButton>
                </MInputWithText>

                <MInputWithText
                    type="name"
                    placeholder={"Change Password"}
                    value={oldPassword}
                    onChange={event => setOldPassword(event.target.value)}
                    onClose={() => setOldPassword("")}
                    isInputsClosed={isInputsClosed}
                    defaultValue={oldPassword}
                >
                    <SettingsEditButton
                        text={"Change Password"}
                        onClick={() => {
                            setIsInputsClosed(true)
                        }}
                    >
                        { isLoading
                            ? <MainLoader />
                            : <><Edit color='#3A325B'/></>
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
                { error
                    ? <Alert className="alert-danger"><strong>Error: </strong>{error}</Alert>
                    : <></>
                }
            </div>
        </>
    );
}

export default SecuritySettings;
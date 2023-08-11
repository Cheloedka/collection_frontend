import {useContext, useEffect, useState} from 'react';
import style from './AccountSettings.module.css'
import MInputWithText from "../../../components/UI/input/MInputWithText";
import SettingsEditButton from "../../../components/UI/button/SettingsEditButton";
import {useFetching} from "../../../hooks/useFetching";
import UserService from "../../../API/UserService";
import {UserContext} from "../../../context";
import MainLoader from "../../../components/UI/loader/MainLoader";
import {Alert} from "react-bootstrap";
import MFileInput from "../../../components/UI/input/MFileInput";
import Edit from "../../../components/UI/svg/Edit";

function AccountSettings({userFirstName, userSurname, setUserFirstName, setUserSurname}) {
    const {username, userImage, setUserImage} = useContext(UserContext)

    const [image, setImage] = useState('')
    const [name, setName] = useState(userFirstName)
    const [surname, setSurname] = useState(userSurname)

    const [errorMessage, setErrorMessage] = useState('')
    const [showImage, setShowImage] = useState('')

    const [isInputsClosed, setIsInputsClosed] = useState(false)

    const [fetchSettings, isLoading, error] = useFetching(async () => {
        let requestData = {}
        if (image !== '')
            requestData.image = image
        if (name !== userFirstName)
            requestData.name = name
        if (surname !== userSurname)
            requestData.surname = surname

        await UserService.userAccountSettings(username, requestData)
        if (image !== '')
            setUserImage(URL.createObjectURL(image))
        if (name !== userFirstName)
            setUserFirstName(name)
        if (surname !== userSurname)
            setUserSurname(surname)
    })

    useEffect(() => {
        setErrorMessage(error)
    },[error])

    useEffect(() => {
        if (image !== '')
            setShowImage(URL.createObjectURL(image))
    },[image])

    useEffect(() => {
        setShowImage(userImage)
    },[userImage])


    function declareUserData(e) {
        e.preventDefault()
        if (image === '' && name === userFirstName && surname === userSurname)
            setErrorMessage("Nothing is changed")
        else
            fetchSettings()
        setIsInputsClosed(false)
    }

    return (
        <div>
            <form onSubmit={declareUserData}>
                <div className={style.divCenter}>
                    <div className={style.divImages}>
                        <img src={showImage} className={style.userImageBig}/>
                        <div className={style.divSmImage}>
                            <img src={showImage} className={style.userImageSm}/>
                            <MFileInput
                                setImage={setImage}
                                maxSize={1}
                                setError={setErrorMessage}
                            >
                                <SettingsEditButton>
                                    Choose image
                                </SettingsEditButton>
                            </MFileInput>
                        </div>
                    </div>

                    <MInputWithText
                        type="name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        onClose={() => setName(userFirstName)}
                        style={{width: "445px"}}
                        placeholder={"Change Name"}
                        isInputsClosed={isInputsClosed}
                        defaultValue={userFirstName}
                    />
                    <MInputWithText
                        type="name"
                        value={surname}
                        onChange={event => setSurname(event.target.value)}
                        onClose={() => setSurname(userSurname)}
                        style={{width: "445px"}}
                        placeholder={"Change Surname"}
                        isInputsClosed={isInputsClosed}
                        defaultValue={userSurname}
                    />

                </div>

                <div className={style.saveChanges}>
                    <button>
                        <SettingsEditButton
                            text={"Save Changes"}
                            onClick={() => setIsInputsClosed(true)}
                        >
                            { isLoading
                                ? <MainLoader />
                                : <><Edit color='#3A325B'/></>
                            }
                        </SettingsEditButton>
                    </button>
                </div>
                <div>
                    { errorMessage
                        ? <Alert className="alert-danger"><strong>Error: </strong>{errorMessage}</Alert>
                        : <></>
                    }
                </div>
            </form>
        </div>
    );
}

export default AccountSettings;
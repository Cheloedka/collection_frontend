import React, {useContext, useEffect, useState} from 'react';
import style from './AccountSettings.module.css'
import MInputWithText from "../../../components/UI/input/MInputWithText";
import SettingsEditButton from "../../../components/UI/button/SettingsEditButton";
import {useFetching} from "../../../hooks/useFetching";
import UserService from "../../../API/UserService";
import {UserContext} from "../../../context";
import MainLoader from "../../../components/UI/loader/MainLoader";
import {Alert} from "react-bootstrap";
import MFileInput from "../../../components/UI/input/MFileInput";

function AccountSettings() {
    const {username, userImage} = useContext(UserContext)

    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [showImage, setShowImage] = useState(userImage)

    const [userData, setUserData] = useState({
        image: '',
        name: '',
        surname: ''
    })

    const [fetchSettings, isLoading, error] = useFetching(async () => {
        let response = await UserService.userAccountSettings(username, userData)
        console.log(response)
    })


    useEffect(() => {
        if (userData.image !== ''|| userData.name !== '' || userData.surname !== '')
            fetchSettings()
    },[userData])

    useEffect(() => {
        setErrorMessage(error)
    },[error])

    useEffect(() => {
        if(image !== '')
            setShowImage(URL.createObjectURL(image))
    },[image])

    function declareUserData(e) {
        e.preventDefault()

        if (image !== '' && name !== '' && surname !== '') {
            setErrorMessage("Nothing can change")
        }
        else {
            let data = {}
            if (name)
                data = {...data, name: name}
            if (surname)
                data = {...data, surname: surname}
            if (image)
                data = {...data, image: image}
            setUserData(data)
        }
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
                        value={name} onChange={event => setName(event.target.value)}
                        style={{width: "445px"}}
                        placeholder={"Change Name"}
                    />
                    <MInputWithText
                        type="name"
                        value={surname} onChange={event => setSurname(event.target.value)}
                        style={{width: "445px"}}
                        placeholder={"Change Surname"}
                    />

                </div>

                <div className={style.saveChanges}>
                    <button>
                        <SettingsEditButton >
                            {isLoading
                                ?<MainLoader />
                                :<>Save Changes</>
                            }
                        </SettingsEditButton>
                    </button>
                </div>
                <div>
                    {errorMessage
                        ? <Alert className="alert-danger"><strong>Error: </strong>{errorMessage}</Alert>
                        : <></>
                    }
                </div>
            </form>
        </div>
    );
}

export default AccountSettings;
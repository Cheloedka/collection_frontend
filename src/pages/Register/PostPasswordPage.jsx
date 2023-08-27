import {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import AuthService from "../../API/AuthService";
import MainLoader from "../../components/UI/loader/MainLoader";
import MInput from "../../components/UI/input/MInput";
import MDiv from "../../components/UI/div/MDiv";
import style from "../Login/PasswordReset.module.css"
import M1Button from "../../components/UI/button/M1Button";
import BooleanDiv from "../../components/UI/div/BooleanDiv";
import MessageModal from "../../components/UI/modal/MessageModal";
import MainMessage from "../../components/UI/message/MainMessage";

function PostPasswordPage() {
    const params = useParams()
    const [token, setToken] = useState( "")
    const [pwd, setPwd] = useState("")

    const [errorMessage, setErrorMessage] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const successMessage = useRef("")

    const [fetchConfirmation, isLoading, postError] = useFetching(async () => {
        successMessage.current = await AuthService.confirmation({token: token, info :pwd})
        setModalVisible(true)
    })

    useEffect( () => {
        setToken(params.id)
    }, [params.id])

    useEffect(() => {
        setErrorMessage(postError)
    }, [postError])

    function declareData(e) {
        e.preventDefault()
        if (token !== "" && pwd !== "") {
            fetchConfirmation()
        }
        else {
            setErrorMessage("Something went wrong, please try again")
        }
    }

    return (
        <div className={style.MReset}>
            <MDiv className={style.mDiv}>
                <h3>New Password</h3>
                <p>Please give new password for your account</p>

                <MessageModal              //if success modal, navigate to login page
                    to={"/login"}
                    visible={modalVisible}
                    setVisible={setModalVisible}
                >
                    {successMessage.current}
                </MessageModal>


                <BooleanDiv bool={!isLoading}>
                    <MainMessage                  //if error
                        type="error"
                        text={errorMessage}
                    />
                </BooleanDiv>

                <form onSubmit={declareData}>
                    <MInput
                        type="password"
                        value={pwd}
                        onChange={event => setPwd(event.target.value)}
                        placeholder="Password"
                    />
                    <M1Button>
                        <BooleanDiv bool={isLoading} ifFalse="Change">
                            <MainLoader />
                        </BooleanDiv>
                    </M1Button>
                </form>
            </MDiv>
        </div>
    );
}

export default PostPasswordPage;
import React, {useEffect, useRef, useState} from 'react';
import style from "./PasswordReset.module.css";
import MDiv from "../../components/UI/div/MDiv";
import MInput from "../../components/UI/input/MInput";
import M1Button from "../../components/UI/button/M1Button";
import {useFetching} from "../../hooks/useFetching";
import MainLoader from "../../components/UI/loader/MainLoader";
import AuthService from "../../API/AuthService";
import MessageModal from "../../components/UI/modal/MessageModal";
import MainMessage from "../../components/UI/message/MainMessage";

function PasswordReset() {

    const [email, setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [modalVisible, setModalVisible] = useState(false)

    const successMessage = useRef()

    const [fetchReset, isLoading, error] = useFetching(async () => {
        successMessage.current = await AuthService.resetPassword({email: email})
        setModalVisible(true)
    })

    useEffect(() => {
        setErrorMessage(error)
    }, [error])


    function declareData(e) {
        e.preventDefault()
        if (email === "")
            setErrorMessage("Email can't be empty")
        else
            fetchReset()
    }

    return (
        <div className={style.MReset} >
            <MDiv className={style.mDiv}>
                <h3>Password Reset</h3>
                <p>Please give your email address to reset password</p>

                <MessageModal              //if success modal, navigate to login page
                    to={"/login"}
                    visible={modalVisible}
                    setVisible={setModalVisible}
                >
                    {successMessage.current}
                </MessageModal>


                { !isLoading ?
                    <MainMessage                  //if error
                        type="error"
                        text={errorMessage}
                    />
                    :<></>

                }

                <form onSubmit={declareData}>
                    <MInput
                        type="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        placeholder="Your email to sent verification"
                    />
                    <M1Button>
                        { isLoading
                            ?<MainLoader />
                            :"Submit"
                        }
                    </M1Button>
                </form>
            </MDiv>
        </div>
    );
}

export default PasswordReset;
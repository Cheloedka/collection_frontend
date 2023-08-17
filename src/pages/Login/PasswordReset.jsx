import React, {useEffect, useState} from 'react';
import style from "./PasswordReset.module.css";
import MDiv from "../../components/UI/div/MDiv";
import MInput from "../../components/UI/input/MInput";
import M1Button from "../../components/UI/button/M1Button";
import {useFetching} from "../../hooks/useFetching";
import MainLoader from "../../components/UI/loader/MainLoader";
import {Alert} from "react-bootstrap";
import AuthService from "../../API/AuthService";

function PasswordReset() {

    const [email, setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isErrorMessage, setIsErrorMessage] = useState(false)

    const [successMessage, setSuccessMessage] = useState("")

    const [fetchReset, isLoading, error] = useFetching(async () => {
        const response = await AuthService.resetPassword({email: email})
        setSuccessMessage(response)
    })

    useEffect(() => {
        setErrorMessage(error)
        setIsErrorMessage(true)
    }, [error])


    function declareData(e) {
        e.preventDefault()
        if (email === "") {
            setErrorMessage("Email can't be empty")
            setIsErrorMessage(true)
        }
        else {
            fetchReset()
        }
    }

    return (
        <div className={style.MReset} >
            <MDiv className={style.mDiv}>
                <h3 className="mb-4">
                    Password Reset
                </h3>

                { errorMessage ?
                    <Alert className="alert-danger">
                        <strong>Error: </strong>
                        {errorMessage}
                    </Alert>
                    : <></>
                }

                { successMessage ?
                    <Alert className="alert-success">
                        <strong>Message: </strong>
                        {successMessage}
                    </Alert>
                    : <></>
                }

                <form onSubmit={declareData}>
                    <MInput
                        type="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        placeholder="Your email to sent verification"
                    />
                    <M1Button>
                        { isLoading ?
                            <MainLoader />
                            : <>Submit</>
                        }

                    </M1Button>
                </form>
            </MDiv>
        </div>
    );
}

export default PasswordReset;
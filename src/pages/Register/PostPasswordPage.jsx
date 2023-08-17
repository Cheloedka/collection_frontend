import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import AuthService from "../../API/AuthService";
import MainLoader from "../../components/UI/loader/MainLoader";
import {Alert} from "react-bootstrap";
import MInput from "../../components/UI/input/MInput";
import MDiv from "../../components/UI/div/MDiv";
import style from "../Login/PasswordReset.module.css"
import M1Button from "../../components/UI/button/M1Button";

function PostPasswordPage() {
    const params = useParams()
    const [token, setToken] = useState( "")
    const [pwd, setPwd] = useState("")

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const [fetchConfirmation, isLoading, postError] = useFetching(async () => {
        const response = await AuthService.confirmation({token: token, info :pwd})
        setSuccessMessage(response)
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
                <h3 className="mb-4">
                    New Password
                </h3>

                { errorMessage
                    ?<Alert variant="danger">
                        <strong>Error: </strong>
                        {errorMessage}
                    </Alert>
                    : <>
                        { successMessage !== ""
                            ?<Alert variant="success"><strong>Message: </strong>{successMessage}</Alert>
                            :<></>
                        }
                    </>
                }

                <form onSubmit={declareData}>
                    <MInput
                        type="password"
                        value={pwd}
                        onChange={event => setPwd(event.target.value)}
                        placeholder="Password"
                    />
                    <M1Button>
                        {isLoading ?
                            <MainLoader color={"black"}/>
                            :<>Submit</>
                        }
                    </M1Button>
                </form>
            </MDiv>
        </div>
    );
}

export default PostPasswordPage;
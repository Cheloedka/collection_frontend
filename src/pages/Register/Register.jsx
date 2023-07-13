import React, {useEffect, useState} from 'react';
import style from "../Login/Login.module.css";
import MDiv from "../../components/UI/div/MDiv";
import {Alert} from "react-bootstrap";
import MInput from "../../components/UI/input/MInput";
import M1Button from "../../components/UI/button/M1Button";
import {useFetching} from "../../hooks/useFetching";
import AuthService from "../../API/AuthService";
import {checkTittleFunction} from "../../functions/stringFunctions";
import MainLoader from "../../components/UI/loader/MainLoader";

function Register() {

    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [name, setName] = useState("")
    const [uName, setUName] = useState("")
    const [surname, setSurname] = useState("")
    const [registerData, setRegisterData] = useState({})

    const [errorMessage, setErrorMessage] = useState('')
    const [confirmMessage, setConfirmMessage] = useState('')


    const [fetchRegister, isLoading, postError] = useFetching(async () => {
        let response = await AuthService.register(registerData)
        setConfirmMessage(response)
    })

    function declareLoginData(e) {
        e.preventDefault()
        if (checkTittleFunction(uName)) {
            setRegisterData({username: uName, name: name, surname: surname, email: email, password: pwd})
        }
        else {
            setErrorMessage(" In username available only characters 'a-z', 'A-Z', '0-9', - _  .")
        }
    }

    useEffect(() => {
        if (email !== "" && pwd !== "" && uName !== "" && surname !== "") {
            fetchRegister()
        }
    }, [registerData])

    useEffect(() => {
        setErrorMessage(postError)
    }, [postError])


    return (
        <div className={style.Login}>
            <MDiv className={style.mDiv}>
                <form onSubmit={declareLoginData}>

                    <h3 className="mb-4">Register</h3>
                    <p>On this page you can register on our website</p>
                    {errorMessage
                        ? <Alert className="alert-danger"><strong>Error: </strong>{errorMessage}</Alert>
                        : <></>
                    }
                    {confirmMessage
                        ? <Alert className="alert-success"><strong>Message: </strong>{confirmMessage}</Alert>
                        : <></>
                    }

                    <MInput type="name" value={uName} onChange={event => setUName(event.target.value)} placeholder="Username" maxLength = "25"/>
                    <MInput type="name" value={name} onChange={event => setName(event.target.value)} placeholder="Name"/>
                    <MInput type="name" value={surname} onChange={event => setSurname(event.target.value)} placeholder="Surname"/>
                    <MInput type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="Email"/>
                    <MInput type="password" value={pwd} onChange={event => setPwd(event.target.value)} placeholder="Password">
                        Password should be: min 8 symbols, min 2 numbers and 1 special symbol(like:  @ $ ^)
                    </MInput>



                    <M1Button>
                        { isLoading
                            ? <MainLoader/>
                            : <>Submit</>
                        }
                    </M1Button>

                </form>
            </MDiv>
        </div>
    );
}

export default Register;
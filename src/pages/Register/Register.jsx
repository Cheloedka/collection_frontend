import {useRef, useState} from 'react';
import style from "../Login/Login.module.css";
import MDiv from "../../components/UI/div/MDiv";
import MInput from "../../components/UI/input/MInput";
import M1Button from "../../components/UI/button/M1Button";
import {useFetching} from "../../hooks/useFetching";
import AuthService from "../../API/AuthService";
import {checkTittleFunction} from "../../functions/stringFunctions";
import MainLoader from "../../components/UI/loader/MainLoader";
import MessageModal from "../../components/UI/modal/MessageModal";
import LoaderAndErrorDiv from "../../components/structureComponents/LoaderAndErrorDiv";
import {useError} from "../../hooks/useLoadingAndError";

function Register() {

    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [name, setName] = useState("")
    const [uName, setUName] = useState("")
    const [surname, setSurname] = useState("")

    const [errorMessage, setErrorMessage] = useState("")
    const [modalVisible, setModalVisible] = useState(false)

    const successMessage = useRef()


    const [fetchRegister, isLoading, postError] = useFetching(async () => {
        setErrorMessage("")
        const registerData = {
            username: uName,
            name: name,
            surname: surname,
            email: email,
            password: pwd
        }

        successMessage.current = await AuthService.register(registerData)
        setModalVisible(true)
    })
    useError(postError, errorMessage)


    function declareLoginData(e) {
        e.preventDefault()
        if (checkTittleFunction(uName)) {
            if (email !== "" && pwd !== "" && uName !== "")
                fetchRegister()
            else
                setErrorMessage("Email, username and password can't be empty")
        }
        else
            setErrorMessage(" In username available only characters 'a-z', 'A-Z', '0-9', - _  .")
    }

    const inputs = [
        {type : "name",  value: uName, onChange: setUName, placeholder: "Username", maxLength: 25},
        {type : "name",  value: name, onChange: setName, placeholder: "Name"},
        {type : "name",  value: surname, onChange: setSurname, placeholder: "Surname"},
        {type : "email",  value: email, onChange: setEmail, placeholder: "Email"},
        {type : "password",  value: pwd, onChange: setPwd, placeholder: "Password",
            children: "Password should be: min 8 symbols, min 2 numbers and 1 special symbol(like:  @ $ ^)"
        }
    ]


    return (
        <div className={style.Login}>
            <MDiv className={style.mDiv}>
                <form onSubmit={declareLoginData}>

                    <h3>Register</h3>
                    <p>On this page you can register on our website</p>

                    <MessageModal
                        to="/login"
                        visible={modalVisible}
                        setVisible={setModalVisible}
                    >
                        {successMessage.current}
                    </MessageModal>


                    <LoaderAndErrorDiv isLoading={false} error={errorMessage} />

                    {inputs.map((c, index) =>
                        <MInput
                            key={index}
                            type={c.type}
                            value={c.value}
                            onChange={event => c.onChange(event.target.value)}
                            placeholder={c.placeholder}
                            maxLength = {c.maxLength}
                        >
                            {c.children}
                        </MInput>
                    )}

                    <M1Button>
                        { isLoading
                            ? <MainLoader />
                            : "Submit"
                        }
                    </M1Button>

                </form>
            </MDiv>
        </div>
    );
}

export default Register;
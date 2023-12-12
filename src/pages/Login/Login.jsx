import {useContext} from 'react';
import M1Button from "../../components/UI/button/M1Button";
import {useState} from 'react';
import {useFetching} from "../../hooks/useFetching"
import {AuthContext} from "../../context";
import {Link, useNavigate} from "react-router-dom";
import MInput from "../../components/UI/input/MInput";
import MDiv from "../../components/UI/div/MDiv";
import style from "./Login.module.css"
import AuthService from "../../API/AuthService";
import MainLoader from "../../components/UI/loader/MainLoader";
import LoaderAndErrorDiv from "../../components/structureComponents/LoaderAndErrorDiv";
import {useError} from "../../hooks/useLoadingAndError";

function Login() {
    const {setIsAuth} = useContext(AuthContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [errorMessage, setErrorMessage] = useState("")


    const [fetchLogin, isLoading, loginError] = useFetching(async () => {
        const loginData = {
            email: email,
            password: pwd
        }
        const response = await AuthService.login(loginData)
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
        localStorage.setItem('authToken', 'Bearer '  + response.access_token)
        localStorage.setItem('refreshToken', 'Bearer ' + response.refresh_token)

        navigate('/')  //todo navigate to main page
    })
    useError(loginError, setErrorMessage)


    function declareLoginData(e) {
        e.preventDefault()
        if (email === "")
            setErrorMessage("Email can't be empty")
        else if (pwd === "")
            setErrorMessage("Password can't be empty")
        else
            fetchLogin()

    }


    const inputs = [
        {type : "email",  value: email, onChange: setEmail, placeholder: "Email"},
        {type : "password",  value: pwd, onChange: setPwd, placeholder: "Password"}
    ]

    return (
        <div className={style.Login}>
            <MDiv className={style.mDiv}>
                <form onSubmit={declareLoginData}>

                    <h3>Login</h3>
                    <p>On this page you can login on our website</p>

                    <LoaderAndErrorDiv error={errorMessage} isLoading={false} />

                    {inputs.map((c, index) =>
                        <MInput
                            key={index}
                            type={c.type}
                            value={c.value}
                            onChange={event => c.onChange(event.target.value)}
                            placeholder={c.placeholder}
                        />
                    )}


                    <div className={style.divButton}>
                        <M1Button>
                            { isLoading
                                ? <MainLoader />
                                :"Submit"
                            }
                        </M1Button>

                        <Link className={style.passwordLink} to="/resetPassword">
                            Forgot your password?
                        </Link>
                    </div>
                </form>
            </MDiv>

            <MDiv className={style.mDiv}>
                <div className={style.registerDiv}>
                    First time here?
                    <Link
                        to="/registration"
                        className={style.passwordLink}
                    >
                        Register
                    </Link>
                </div>
            </MDiv>
        </div>
    );
}

export default Login;
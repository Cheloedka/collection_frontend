import React, {useContext, useEffect} from 'react';
import M1Button from "../../components/UI/button/M1Button";
import {useState} from 'react';
import {useFetching} from "../../hooks/useFetching"
import {AuthContext} from "../../context";
import {Link, useNavigate} from "react-router-dom";
import {Alert} from "react-bootstrap";
import MInput from "../../components/UI/input/MInput";
import MDiv from "../../components/UI/div/MDiv";
import style from "./Login.module.css"
import AuthService from "../../API/AuthService";
import MainLoader from "../../components/UI/loader/MainLoader";

function Login() {

    const {setIsAuth} = useContext(AuthContext)

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [loginData, setLoginData] = useState({email: "", password: ""})


    const [fetchLogin, isLoading, loginError] = useFetching(async () => {
        const response = await AuthService.login(loginData)
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
        localStorage.setItem('authToken', 'Bearer '  + response.token)
        navigate('/')
    })

    function declareLoginData(e) {
        e.preventDefault()
        setLoginData({email: email, password: pwd})
    }

    useEffect(() => {
        if (email !== "" && pwd !== "")
            fetchLogin()

    },[loginData])

    function BRegister(e){
        e.preventDefault()
        navigate('/registration')
    }

    return (
        <div className={style.Login}>
            <MDiv className={style.mDiv}>
                <form onSubmit={declareLoginData}>

                    <h3 className="mb-4">Login</h3>
                    { loginError ?
                        <Alert className="alert-danger">
                            <strong>Error: </strong>
                            {loginError}
                        </Alert>
                        : <></>
                    }

                    <MInput
                        type="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        placeholder="Email"
                    />
                    <MInput
                        type="password"
                        value={pwd}
                        onChange={event => setPwd(event.target.value)}
                        placeholder="Password"
                    />
                    <div className={style.divButton}>
                        <M1Button>
                            { isLoading
                                ? <MainLoader />
                                : <>Submit</>
                            }
                        </M1Button>
                        <Link
                            className={style.passwordLink}
                            to={"/resetPassword"}>
                            Forgot your password?
                        </Link>
                    </div>

                </form>
            </MDiv>
            <MDiv className={style.mDiv}>
                <div className={style.registerDiv}>
                    First time here?
                    <button onClick={BRegister} className={style.passwordLink}>
                        Register
                    </button>
                </div>
            </MDiv>
        </div>
    );
}

export default Login;
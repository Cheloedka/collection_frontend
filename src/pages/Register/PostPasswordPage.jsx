import {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import AuthService from "../../API/AuthService";
import MainLoader from "../../components/UI/loader/MainLoader";
import MInput from "../../components/UI/input/MInput";
import MDiv from "../../components/UI/div/MDiv";
import style from "../Login/PasswordReset.module.css"
import M1Button from "../../components/UI/button/M1Button";
import MessageModal from "../../components/UI/modal/MessageModal";
import LoaderAndErrorDiv from "../../components/structureComponents/LoaderAndErrorDiv";
import {useError} from "../../hooks/useLoadingAndError";

function PostPasswordPage() {
    const params = useParams()
    const [token, setToken] = useState( "")
    const [pwd, setPwd] = useState("")

    const [error, setError] = useState("")
    const [modalVisible, setModalVisible] = useState(false)
    const successMessage = useRef("")

    const [fetchConfirmation, isLoading, postError] = useFetching(async () => {
        successMessage.current = await AuthService.confirmation({token: token, info :pwd})
        setModalVisible(true)
    })
    useError(postError, setError)

    useEffect( () => {
        setToken(params.id)
    }, [params.id])

    function declareData(e) {
        e.preventDefault()
        if (token !== "" && pwd !== "") {
            fetchConfirmation()
        }
        else {
            setError("Something went wrong, please try again")
        }
    }

    return (
        <div className={style.MReset}>
            <MDiv className={style.mDiv}>
                <h3>New Password</h3>
                <p>Please give new password for your account</p>

                <MessageModal              //if success modal, navigate to login page
                    to="/login"
                    visible={modalVisible}
                    setVisible={setModalVisible}
                >
                    {successMessage.current}
                </MessageModal>


                <LoaderAndErrorDiv isLoading={false} error={error} />

                <form onSubmit={declareData}>
                    <MInput
                        type="password"
                        value={pwd}
                        onChange={event => setPwd(event.target.value)}
                        placeholder="Password"
                    />
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

export default PostPasswordPage;
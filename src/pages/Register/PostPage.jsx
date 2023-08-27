import {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import AuthService from "../../API/AuthService";
import MainLoader from "../../components/UI/loader/MainLoader";
import BooleanDiv from "../../components/UI/div/BooleanDiv";
import MessageModal from "../../components/UI/modal/MessageModal";
import MainMessage from "../../components/UI/message/MainMessage";

function PostPage() {
    const params = useParams()

    const [token, setToken] = useState("")
    const [modalVisible, setModalVisible] = useState(false)

    const successMessage = useRef("")

    const [fetchConfirmation, isLoading, postError] = useFetching(async () => {
        successMessage.current = await AuthService.confirmation({token: token})
        setModalVisible(true)
    })

    useEffect( () => {
        setToken(params.id)
    }, [params.id])

    useEffect(() => {
        if (token.token !== "") {
            fetchConfirmation()
        }
    }, [token])

    return (
        <div>
            <BooleanDiv bool={isLoading}>
                <MainLoader />
            </BooleanDiv>

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
                    text={postError}
                />
            </BooleanDiv>

        </div>
    );
}

export default PostPage;
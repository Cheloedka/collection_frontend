import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import AuthService from "../../API/AuthService";
import {Alert} from "react-bootstrap";
import MainLoader from "../../components/UI/loader/MainLoader";

function PostPage() {
    const params = useParams()
    const [token, setToken] = useState({token: ""})

    const [fetchConfirmation, isLoading, postError] = useFetching(async () => {
        await AuthService.confirmation(token)
    })

    useEffect( () => {
        setToken({token: params.id})
    }, [params.id])

   useEffect(() => {
        if (token.token !== "") {
            fetchConfirmation()
        }
    }, [token])

    return (
        <div>
            {isLoading
                ?<MainLoader />
                :
                <>
                {postError
                    ?<Alert variant="danger">
                        <strong>Error: </strong>
                        {postError}
                    </Alert>
                    :<Alert variant="success"><strong>Message:</strong> Email confirmed</Alert>
                }
                </>
            }
            
        </div>
    );
}

export default PostPage;
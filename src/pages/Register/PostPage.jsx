import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import AuthService from "../../API/AuthService";
import {Alert} from "react-bootstrap";
import MainLoader from "../../components/UI/loader/MainLoader";

function PostPage() {
    const params = useParams()
    const [token, setToken] = useState({token: ""})
    const [successResponse, setSuccessResponse] = useState('')

    const [fetchConfirmation, isLoading, postError] = useFetching(async () => {
        const response = await AuthService.confirmation(token)
        setSuccessResponse(response)
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
                    : <>
                        {successResponse !== ""
                            ?<Alert variant="success"><strong>Message: </strong>{successResponse}</Alert>
                            :<></>
                        }
                    </>
                }

                </>
            }
            
        </div>
    );
}

export default PostPage;
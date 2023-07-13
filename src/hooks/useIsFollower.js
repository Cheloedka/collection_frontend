import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import FriendshipService from "../API/FriendshipService";
import {useFetching} from "./useFetching";

function UseIsFollower() {
    const params = useParams()

    const [response, setResponse] = useState()

    const [followerFetch, isLoading, error] = useFetching(async () => {
        let response = await FriendshipService.isFollowingExist(params.username)
        setResponse(response)
        console.log(error)
    })

    useEffect(() => {
        followerFetch()
    }, [params])
    return response
}

export default UseIsFollower;
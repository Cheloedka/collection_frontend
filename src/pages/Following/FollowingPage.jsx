import React, {useEffect, useState} from 'react';
import MDivWithSpans from "../../components/UI/div/MDivWithSpans";
import PaginationButtons from "../../components/UI/pagination/PaginationButtons";
import style from "./FollowingPage.module.css"
import MainLoader from "../../components/UI/loader/MainLoader";
import MainMessage from "../../components/UI/message/MainMessage";
import {useFetching} from "../../hooks/useFetching";
import FriendshipService from "../../API/FriendshipService";
import {useParams} from "react-router-dom";
import FollowList from "./FollowList";

function FollowingPage() {
    const params = useParams()

    const [contentList, setContentList] = useState([])
    const [page, setPage] = useState(0)


    const [followingPageFetch, isLoading, error] = useFetching(async () => {
        const request = await contentPage()
        setContentList(request);
    })



    useEffect(() => {
        followingPageFetch()
    }, [params.username, page])


    async function contentPage() {
        switch (page) {
            case 0:
                return await FriendshipService.getFollowing(params.username)

            case 1:
                return await FriendshipService.getFollowers(params.username)

        }
    }

    const buttons = [
        {title: "Following"},
        {title: "Followers"}
    ]


    return (
        <div>
            <MDivWithSpans
                mainText={buttons[page].title}
                secondText={contentList.length}
                childrenCloseToText={
                    <div className={style.navButtons}>
                        <PaginationButtons pageNumber={setPage} buttons={buttons}/>
                    </div>
                }
            >

            </MDivWithSpans>

            { isLoading
                ? <MainLoader />
                : <FollowList contentList={contentList}/>

            }

            {!isLoading ?
                <MainMessage
                    type="error"
                    text={error}
                />
                :<></>
            }

        </div>
    );
}

export default FollowingPage;
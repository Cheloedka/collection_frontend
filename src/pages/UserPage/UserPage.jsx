import {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import MDiv from "../../components/UI/div/MDiv";
import {useFetching} from "../../hooks/useFetching";
import MainLoader from "../../components/UI/loader/MainLoader";
import UserService from "../../API/UserService";
import style from "./UserPage.module.css"
import {getImage, getUserImage} from "../../functions/imageFunctions";
import Banner from "../../components/banner/Banner";
import GroupIcoButtons from "../../components/UI/button/GroupIcoButtons";
import useIsCurrentUser from "../../hooks/useIsCurrentUser";
import BannerInfo from "../../components/banner/BannerInfo";
import UserPageCollectionList from "./UserPageCollectionList";
import Settings from "../../components/UI/svg/Settings";
import Following from "../../components/UI/svg/Following";
import Unfollowing from "../../components/UI/svg/Unfollowing";
import {AuthContext} from "../../context";
import UserPageFollowingList from "./UserPageFollowingList";
import PlusButton from "../../components/UI/button/PlusButton";
import MDivWithLinkSpans from "../../components/UI/div/MDivWithLinkSpans";
import MDivWithSpans from "../../components/UI/div/MDivWithSpans";
import CollectionItemPostList from "../../components/CollectionItemPost/CollectionItemPostList";
import Tooltip from "../../components/UI/tooltip/Tooltip";
import {useNotFoundNavigate} from "../../hooks/useNotFoundNavigate";
import FriendshipService from "../../API/FriendshipService";

function UserPage() {
    const params = useParams()
    const isUser = useIsCurrentUser()
    const {isAuth} = useContext(AuthContext)

    const [isFollowers, setIsFollowers] = useState(false)
    const [user, setUser] = useState({})
    const [backImage, setBackImage] = useState("")

    const [userPageFetch, isLoading, userError] = useFetching( async () => {
        let response = await UserService.userPageInfo(params.username)
        setIsFollowers(response.follower)
        setUser(response)

    })

    useNotFoundNavigate(userError)

    useEffect(() => {
        userPageFetch()
    },[params.username])

    async function manageFriend(isDelete, setIsFollowers, username) {
        let func
        if (isDelete)
            func = () => FriendshipService.deleteFollowing(username)
        else
            func = () => FriendshipService.newFollowing(username)

        await func()
        setIsFollowers(prev => !prev)
    }

    function buttonContent() {
        if (isUser) {
            return <GroupIcoButtons
                firstIco = {
                    <Tooltip text="Settings">
                        <Settings
                            color="#3A325B"
                            width="35px"
                            height="35px"
                        />
                    </Tooltip>
                }
                firstIcoTo = "/settings"
            />
        }
        else if (isFollowers) {
            return <GroupIcoButtons
                firstIco={
                    <Tooltip text="Unfollow">
                        <div className={style.divUnfollowing}
                             onClick={() => manageFriend(true)}
                        >
                            <Unfollowing color="#3A325B"/>
                        </div>
                    </Tooltip>
                }
            />
        }
        else {
            return <GroupIcoButtons
                firstIco = {
                    <Tooltip text="Follow">
                        <div className={style.divFollowing}
                             onClick={() => manageFriend(false)}
                        >
                            <Following color="white"/>
                        </div>
                    </Tooltip>
                }
            />
        }
    }

    if (user?.username) {
        return (
            <div className={style.main}>
                <Banner
                    backImage={backImage ? getImage(backImage) : getImage(user.backgroundImage)}
                    setBackImage={setBackImage}
                    mainImage={getUserImage(user.image)}
                    imageType="USER"
                >
                    <MDiv className={style.divInsideBanner}>
                        <BannerInfo
                            tittle={user.username}
                            secondText={user.name + " " + user.surname}
                        />
                        { isAuth
                            ? <> {buttonContent()} </>
                            : <> </>
                        }
                    </MDiv>
                </Banner>

                <div className={style.divContent}>
                    <div className={style.divContentLeft}>
                        <MDivWithSpans
                            mainText="Last collections update"
                        />
                        <CollectionItemPostList
                            username={user.username}
                            type="USER"
                        />
                    </div>

                    <div className={style.divContentRight}>
                        <MDivWithLinkSpans
                            to={"/" + user.username + "/following"}
                            mainText="Following"
                            secondText={user.countFriendships}
                        >
                            <UserPageFollowingList
                                friendships={user.friendships}
                            />
                        </MDivWithLinkSpans>

                        <MDivWithLinkSpans
                            to={"/" + user.username + "/collections"}
                            mainText={"Collections"}
                            secondText={user.countCollections}
                            childrenCloseToText={
                                <PlusButton
                                    to={"/collections/create"}
                                    className={style.buttonAddCollection}
                                />
                            }
                        >
                            <UserPageCollectionList
                                collections={user.collections}
                                username={user.username}
                            />
                        </MDivWithLinkSpans>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return <MainLoader isLoading={isLoading} />
    }
}

export default UserPage;
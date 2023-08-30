import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import MDiv from "../../components/UI/div/MDiv";
import {useFetching} from "../../hooks/useFetching";
import MainLoader from "../../components/UI/loader/MainLoader";
import UserService from "../../API/UserService";
import style from "./UserPage.module.css"
import {getImage, getUserImage} from "../../functions/imageFunctions";
import Banner from "../../components/UI/div/Banner";
import GroupIcoButtons from "../../components/UI/button/GroupIcoButtons";
import useIsCurrentUser from "../../hooks/useIsCurrentUser";
import BannerInfo from "../../components/UI/div/BannerInfo";
import UserPageCollectionList from "./UserPageCollectionList";
import Settings from "../../components/UI/svg/Settings";
import Edit from "../../components/UI/svg/Edit";
import Following from "../../components/UI/svg/Following";
import Message from "../../components/UI/svg/Message";
import Unfollowing from "../../components/UI/svg/Unfollowing";
import FriendshipService from "../../API/FriendshipService";
import {AuthContext} from "../../context";
import UserPageFollowingList from "./UserPageFollowingList";
import MessageModal from "../../components/UI/modal/MessageModal";

function UserPage() {
    const params = useParams()
    const navigate = useNavigate()
    const isUser = useIsCurrentUser()
    const {isAuth} = useContext(AuthContext)

    const [modalVisible, setModalVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [background, setBackground] = useState("")

    const [isFollowers, setIsFollowers] = useState(false)

    const [user, setUser] = useState({
        username: "",
        name: "",
        surname: "",
        image: "",
        background: "",
        countCollections: 0,
        collections: [] ,
        countFriendships: 0,
        friendships: []
    })
    const [userPageFetch, isLoading, error] = useFetching( async () => {
        let response = await UserService.userPageInfo(params.username)
        setUser({
            username: response.username,
            name: response.name,
            surname: response.surname,
            image: getUserImage(response.image),
            background: getImage(response.backgroundImage),
            countCollections: response.countCollections,
            collections: response.collections,
            countFriendships: response.countFriendships,
            friendships: response.friendships
        })
        setIsFollowers(response.isFollower)
    })

    useEffect(() => {
        if (error) {
            navigate("/error")
        }
    }, [error])



    useEffect(() => {
        userPageFetch()
    },[params.username])

    useEffect(() => {
        if(background !== '') {
            console.log("back")
            setUser(prev => ({...prev, background: URL.createObjectURL(background)}))
        }
    },[background])

    async function manageFriend(isDelete) {
        let func
        if (isDelete)
            func = () => FriendshipService.deleteFollowing(params.username)
        else
            func = () => FriendshipService.newFollowing(params.username)

        await func().then(r => console.log(r))
        setIsFollowers(prev => !prev)
    }

    return (
        <div>
            <MessageModal              //if error show modal  //todo error message to background change
                to={"/login"}
                visible={modalVisible}
                setVisible={setModalVisible}
            >
                {errorMessage}
            </MessageModal>

            <Banner
                backImage={user.background}
                setBackImage={setBackground}
                setErrorMessage={setErrorMessage}
                mainImage={user.image}
                isUser={isUser}
                imageType={"user"}
            >
                { isLoading
                    ?<MainLoader />
                    :<></>
                }
                <MDiv className={style.divUserContent}>
                    <BannerInfo
                        tittle={user.username}
                        secondText={user.name + " " + user.surname}
                    />
                    { isAuth && isUser ?
                        <GroupIcoButtons
                            firstIco={
                            <Settings
                                color={'#3A325B'}
                                width={'35px'}
                                height={'35px'}
                            />
                        }
                            firstIcoTo={'/settings'}
                        /> :
                        <GroupIcoButtons
                            firstIco={<Message/>}
                            secondIco={isFollowers ?
                                    <div className={style.divFollowing}
                                         onClick={() => manageFriend(false)}>
                                        <Following color={'white'}/>
                                    </div>
                                     :
                                    <div className={style.divUnfollowing}
                                         onClick={() => manageFriend(true)}>
                                        <Unfollowing color={'#3A325B'}/>
                                    </div>
                            }
                        />
                    }
                </MDiv>
            </Banner>

            <div className={style.divContent}>

                <div className={style.divContentLeft}>
                    <MDiv>
                        <Link to={'/' + params.username + '/following'}>
                            <span className={style.spanMainSpan}>
                                Following
                            </span>
                            <span className={style.spanSecondSpan}>
                                {user.countFriendships}
                            </span>
                        </Link>
                        <UserPageFollowingList friendships={user.friendships}/>
                    </MDiv>

                    <MDiv>
                        <div className={style.divSpanButtonCollections}>
                            <Link to={'/' + params.username + '/collections'}>
                                <div>
                                    <span className={style.spanMainSpan}>
                                        Collections
                                    </span>
                                    <span className={style.spanSecondSpan}>
                                        {user.countCollections}
                                    </span>
                                </div>
                            </Link>
                            {!!isUser ?
                                <Link
                                    to={'/collections/create'}
                                    className={style.buttonAddCollection}
                                >
                                    +
                                </Link>
                                :<></>

                            }
                        </div>
                        <UserPageCollectionList
                            collections={user.collections}
                            username={params.username}
                        />
                    </MDiv>
                </div>

                <MDiv className={style.divContentRight}>
                    <span className={style.spanMainSpan}>
                        Last collections update
                    </span>
                </MDiv>
            </div>
        </div>
    );
}

export default UserPage;
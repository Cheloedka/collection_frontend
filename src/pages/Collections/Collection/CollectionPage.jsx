import {useEffect, useRef, useState} from 'react';
import Banner from "../../../components/UI/div/Banner";
import {useFetching} from "../../../hooks/useFetching";
import {Link, useNavigate, useParams} from "react-router-dom";
import CollectionService from "../../../API/CollectionService";
import {getCollectionImage, getImage, getUserImage} from "../../../functions/imageFunctions";
import useIsCurrentUser from "../../../hooks/useIsCurrentUser";
import BannerInfo from "../../../components/UI/div/BannerInfo";
import GroupIcoButtons from "../../../components/UI/button/GroupIcoButtons";
import MDiv from "../../../components/UI/div/MDiv";
import style from './CollectionPage.module.css'
import Tag from "../../../components/UI/div/Tag";
import Settings from "../../../components/UI/svg/Settings";
import Edit from "../../../components/UI/svg/Edit";
import MainLoader from "../../../components/UI/loader/MainLoader";
import RightInfo from "./RightInfo/RightInfo";
import CollectionPageItemsList from "./CollectionPageItemsList";

function CollectionPage() {
    let params = useParams()
    let navigate = useNavigate()
    const isUser = useIsCurrentUser()

    const [collection, setCollection] = useState({})
    const [collectionUser, setCollectionUser] = useState({})
    const [items, setItems] = useState([])


    const topRef = useRef(null);
    const focusDiv = () => {              //scroll to top page useRef
        window.scrollTo({
            top: topRef.current.offsetTop
        });
    }

    const [collectionPageFetch, isLoading, error] = useFetching( async () => {
        let response = await CollectionService.getCollection(params.id, params.username)
        if (response.private === true && isUser === false)
            navigate("/error")
        else {
            setCollection({
                name: response.name,
                about: response.about,
                information: response.information,
                image: getCollectionImage(response.image),
                backgroundImage: getImage(response.backgroundImage),
                private: response.private,
                countItems: response.countItems
            })
            setCollectionUser({
                name: response.userFirstName,
                surname: response.userSurname,
                image: getUserImage(response.userImage)
            })
            setItems(response.items)
        }
    })

    useEffect(() => {
        if (params.id >= 0) //checks if entered in link id is a number, not string
            collectionPageFetch()
        else
            navigate("/error")
    },[])

    useEffect(() => {
        if (error)
            navigate("/error")
    }, [error])


    return (
        <div>

            <Banner
                imageType={"collection"}
                backImage={collection.backgroundImage}
                mainImage={collection.image}
                isUser={isUser}
            >
                {isLoading
                    ?<MainLoader />
                    :<></>
                }

                <MDiv className={style.divCollectionContent}>
                    <div className={style.divMainContent} ref = {topRef}>  {/*scroll to top page useRef*/}

                        <BannerInfo
                            tittle={collection.name}
                            secondText={collection.about}
                            themes={'dark'}
                        />
                        {isUser ?
                            <GroupIcoButtons
                            secondIcoTo={"edit"}
                            secondIco={<Edit color={"white"} />}
                            />
                            :<></>
                        }

                    </div>
                    <div
                        className={style.divInfoContent}
                    >
                        {collection.information}
                    </div>
                    <div className={style.divTagsContent}>
                        { collection.private === true
                            ? <Tag>Private</Tag>
                            : <Tag color={"green"}>
                                Public
                              </Tag>
                        }
                    </div>
                </MDiv>
            </Banner>

            <div className={style.OtherContent}>
                <MDiv>
                    <div className={style.divSpanButtonCollections}>
                        <div>
                        <span className={style.spanMainSpan}>
                            Collections Items
                        </span>
                            <span className={style.spanSecondSpan}>
                            {collection.countItems}
                        </span>
                        </div>
                        {!!isUser ?
                            <Link
                                to={"/" + params.id + "/item/create"}
                                className={style.buttonAddCollection}
                            >
                                +
                            </Link>
                            :<></>
                        }
                    </div>

                    <CollectionPageItemsList items={items}/>

                </MDiv>

                <MDiv>
                    <span className={style.spanMainSpan}>
                        Collections Posts
                    </span>
                </MDiv>


                <div className={style.bottomSection}>
                    <MDiv className={style.leftPosts}>
                        <span className={style.spanMainSpan}>
                            Collections Posts
                        </span>
                    </MDiv>

                    <div className={style.divRightInfo}>
                       <RightInfo
                           image={collectionUser.image}
                           text1={params.username}
                           text2={collectionUser.name + " " + collectionUser.surname}
                           onClick={() => {navigate("/" + params.username)}}
                       />
                        <RightInfo
                            image={collection.image}
                            text1={collection.name}
                            text2={collection.about}
                            onClick={() => focusDiv()}  /*scroll to top page useRef*/
                        />
                    </div>
                </div>

            </div>

        </div>
    );
}

export default CollectionPage;
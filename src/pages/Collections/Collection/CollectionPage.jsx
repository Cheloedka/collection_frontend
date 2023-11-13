import React, {useEffect, useRef, useState} from 'react';
import Banner from "../../../components/banner/Banner";
import {useFetching} from "../../../hooks/useFetching";
import {Link, useNavigate, useParams} from "react-router-dom";
import CollectionService from "../../../API/CollectionService";
import {getCollectionImage, getImage} from "../../../functions/imageFunctions";
import useIsCurrentUser from "../../../hooks/useIsCurrentUser";
import BannerInfo from "../../../components/banner/BannerInfo";
import GroupIcoButtons from "../../../components/UI/button/GroupIcoButtons";
import MDiv from "../../../components/UI/div/MDiv";
import style from './CollectionPage.module.css'
import Tag from "../../../components/UI/div/Tag";
import Edit from "../../../components/UI/svg/Edit";
import MainLoader from "../../../components/UI/loader/MainLoader";
import CollectionPageItemsList from "./CollectionPageItemsList";
import RightDivsBlock from "../../../components/RightInfo/RightDivsBlock";
import CollectionItemPostList from "../../../components/CollectionItemPost/CollectionItemPostList";
import Delete from "../../../components/UI/svg/Delete";
import MessageModal from "../../../components/UI/modal/MessageModal";
import PlusButton from "../../../components/UI/button/PlusButton";
import MDivWithSpans from "../../../components/UI/div/MDivWithSpans";
import MDivWithLinkSpans from "../../../components/UI/div/MDivWithLinkSpans";

function CollectionPage() {
    let params = useParams()
    let navigate = useNavigate()
    const isUser = useIsCurrentUser()

    const [items, setItems] = useState([])

    const [collection, setCollection] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const topRef = useRef(null);


    const [collectionPageFetch, isLoading, error] = useFetching( async () => {
        let response = await CollectionService.getCollection(params.idCollection, params.username)
        if (response.private === true && isUser === false)
            navigate("/error")
        else {
            setCollection({
                name: response.name,
                about: response.about,
                information: response.information,
                image: getCollectionImage(response.image),
                backgroundImage: getImage(response.backgroundImage),
                private: response.collectionPrivate,
                countItems: response.countItems
            })
            setItems(response.items)
        }
    })

    useEffect(() => {
        if (params.idCollection >= 0) //checks if entered in link id is a number, not string
            collectionPageFetch()
        else
            navigate("/error")
    },[])

    useEffect(() => {
        if (error)
            navigate("/error")
    }, [error])

    async function deleteCollection() {
        await CollectionService.deleteCollection(params.idCollection)
        navigate("/" + params.username)
    }


    if (collection)
        return (
            <div>
                <Banner
                    imageType={"collection"}
                    backImage={collection.backgroundImage}
                    mainImage={collection.image}
                    isUser={isUser}
                >

                    <MDiv className={style.divCollectionContent}>
                        <div className={style.divMainContent} ref = {topRef}>  {/*scroll to top page useRef*/}

                            <BannerInfo
                                tittle={collection.name}
                                secondText={collection.about}
                                themes={'dark'}
                            />
                            {isUser ?
                                <GroupIcoButtons
                                firstIco={
                                    <div onClick={() => setModalVisible(true)}>
                                        <Delete />
                                    </div>
                                }
                                secondIcoTo={"edit"}
                                secondIco={<Edit color={"white"} />}
                                />
                                :<></>
                            }

                            <MessageModal visible={modalVisible}
                                          setVisible={setModalVisible}
                                          acceptCallback={() => deleteCollection()}
                            >
                                Are you sure to delete Collection?
                            </MessageModal>

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

                    <MDivWithLinkSpans
                        mainText={"Collections Items"}
                        secondText={collection.countItems}
                        childrenCloseToText={
                            <PlusButton
                                to={"/" + params.username + "/" + params.idCollection + "/item/create"}
                                className={style.buttonAddCollection}
                            />
                        }
                    >
                        <CollectionPageItemsList items={items} idCollection={params.idCollection}/>
                    </MDivWithLinkSpans>

                    <MDivWithSpans
                        mainText={"Collections Posts"}
                    >

                    </MDivWithSpans>


                    <div className={style.bottomSection}>

                        <div className={style.leftPosts}>
                            <CollectionItemPostList />
                        </div>

                        <div className={style.rightInfo}>
                            <RightDivsBlock topRef={topRef}/>
                        </div>

                    </div>

                </div>

            </div>
        );
    else
        return <MainLoader />
}

export default CollectionPage;
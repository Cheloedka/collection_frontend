import React, {useEffect, useState} from 'react';
import Banner from "../../../components/UI/div/Banner";
import {useFetching} from "../../../hooks/useFetching";
import {useNavigate, useParams} from "react-router-dom";
import CollectionService from "../../../API/CollectionService";
import {getCollectionImage, getImage} from "../../../functions/imageFunctions";
import useIsCurrentUser from "../../../hooks/useIsCurrentUser";
import BannerInfo from "../../../components/UI/div/BannerInfo";
import GroupIcoButtons from "../../../components/UI/button/GroupIcoButtons";
import MDiv from "../../../components/UI/div/MDiv";
import style from './CollectionPage.module.css'
import Tag from "../../../components/UI/div/Tag";
import Settings from "../../../components/UI/svg/Settings";
import Edit from "../../../components/UI/svg/Edit";
import MainLoader from "../../../components/UI/loader/MainLoader";

function CollectionPage(props) {
    let params = useParams()
    let navigate = useNavigate()
    const isUser = useIsCurrentUser()

    const [collection, setCollection] = useState({
        name: '',
        about: '',
        information: '',
        image: '1686935268303qtKmZs1.jpg',
        backgroundImage: '',
        private: ''
    })

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
                private: response.private
            })
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
    <>
        {isLoading
            ?<MainLoader></MainLoader>
            :
            <div>
                <Banner
                    imageType={"collection"}
                    backImage={collection.backgroundImage}
                    mainImage={collection.image}
                    isUser={isUser}
                >
                    <MDiv className={style.divCollectionContent}>
                        <div className={style.divMainContent}>
                            <BannerInfo tittle={collection.name} secondText={collection.about} themes={'dark'}/>
                            {isUser
                                ?
                                <GroupIcoButtons
                                firstIco={<Settings color={'white'} width={'35px'} height={'35px'}/>}
                                secondIco={<Edit color={'white'}/>}
                                />
                               :<></>
                            }
                        </div>
                        <div className={style.divInfoContent}>
                            {collection.information}
                        </div>
                        <div className={style.divTagsContent}>
                            {collection.private === true
                                ?<Tag>Private</Tag>
                                :<Tag color={'green'}>Public</Tag>
                            }
                        </div>
                    </MDiv>
                </Banner>
                <MDiv>
                    Collections Items
                </MDiv>
                <MDiv>
                    Collections Update
                </MDiv>

            </div>
        }
    </>
    );
}

export default CollectionPage;
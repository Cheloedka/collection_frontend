import {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import ItemService from "../../API/ItemService";
import style from "./ItemPage.module.css"
import MainLoader from "../../components/UI/loader/MainLoader";
import GroupIcoButtons from "../../components/UI/button/GroupIcoButtons";
import Edit from "../../components/UI/svg/Edit";
import useIsCurrentUser from "../../hooks/useIsCurrentUser";
import MDiv from "../../components/UI/div/MDiv";
import ItemImagesMap from "./ItemImagesMap";
import Like from "../../components/UI/svg/Like";
import RightDivsBlock from "../Collections/Collection/RightInfo/RightDivsBlock";
import defaultItemImage from '../../images/imageNotFound.png'

function ItemPage() {
    const params = useParams()
    const navigate = useNavigate()
    const isUser = useIsCurrentUser()

    const [item, setItem] = useState()

    const [itemFetch, isLoading, error] = useFetching(async () => {
        const response = await ItemService.getItem(params.idCollection, params.idItem)

        if (response.private === true && isUser === false)
            navigate("/error")
        else {
            setItem(response)
        }
    })



    useEffect(() => {
        if (params.idCollection >= 0 && params.idItem >=0) //checks if entered in link id is a number, not string
            itemFetch()
        else
            navigate("/error")
    },[])

    useEffect(() => {
        if (error)
            navigate("/error")
    }, [error])



    if (item)
        return (
            <>
                <MDiv className={style.opacityBannerDiv}>
                    <div className={style.divMainContent}>
                        <div className={style.divContentWithoutEditIco}>
                            {item.images.length > 0
                                ? <ItemImagesMap images={item.images} defaultImage={item.images[0].name}/>
                                : <img className={style.imageBg} src={defaultItemImage} alt={"something"}/>

                            }


                            <div className={style.divInfo}>
                                <span className={style.span1}> {item.name} </span>
                                <span className={style.span2}> {item.about} </span>
                                <span className={style.span3}>{item.information} </span>
                            </div>
                        </div>
                        <div className={style.absoluteEdit}>
                            { isUser ?
                                <GroupIcoButtons
                                    secondIcoTo={"/" + params.username +
                                        "/" + params.idCollection +
                                        "/" + params.idItem + "/edit"}
                                    secondIco={<Edit color={"white"} />}
                                />
                                : <></>
                            }
                        </div>

                    </div>
                    <div className={style.likesCount}>
                        <span className={style.span2}>{item.likesCount}</span>
                        <Like width={"14px"}/>
                    </div>
                </MDiv>
                <div className={style.bottomSection}>
                    <MDiv className={style.leftComments}>

                    </MDiv>

                    <RightDivsBlock link={"/" + params.username + "/" + params.idCollection}/>
                </div>
            </>
        );
    else return <MainLoader />
}

export default ItemPage;
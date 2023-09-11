import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useFetching} from "../../hooks/useFetching";
import ItemService from "../../API/ItemService";
import style from "./ItemPage.module.css"
import MainLoader from "../../components/UI/loader/MainLoader";
import GroupIcoButtons from "../../components/UI/button/GroupIcoButtons";
import Edit from "../../components/UI/svg/Edit";
import useIsCurrentUser from "../../hooks/useIsCurrentUser";
import MDiv from "../../components/UI/div/MDiv";
import {getCollectionImage} from "../../functions/imageFunctions";

function ItemPage() {
    const params = useParams()
    const navigate = useNavigate()
    const isUser = useIsCurrentUser()

    const [item, setItem] = useState()
    const [image, setImage] = useState("")

    const [itemFetch, isLoading, error] = useFetching(async () => {
        const response = await ItemService.getItem(params.id, params.idItem)
        setItem(response)
        setImage(response.images[0].name)
    })

    useEffect(() => {
        if (params.id >= 0) //checks if entered in link id is a number, not string
            itemFetch()
        else
            navigate("/error")
    },[])

    useEffect(() => {
        if (error)
            navigate("/error")
    }, [error])

    function setImageById(id) {
        console.log(id + " " + item.images[id])
        setImage(() => item.images[id].name)
    }

    if (item)
    return (
        <MDiv className={style.opacityBannerDiv}>
            <div>
                <div className={style.divMainContent}>  {/*scroll to top page useRef*/}

                    <div className={style.imagesDiv}>
                        { item.images
                            .map((c, index) =>
                                <div className={style.imageDiv}
                                     key={index}
                                     onClick={() => setImageById(index)}
                                >
                                    <img className={style.imageSm} src={getCollectionImage(c.name)} alt={"something"}/>
                                </div>
                        )}
                    </div>

                    <div>
                        <img className={style.imageBg} src={getCollectionImage(image)} alt={"something"}/>
                    </div>


                    <div className={style.divInfo}>
                        <span className={style.span1}> {item.name} </span>
                        <span className={style.span2}> {item.about} </span>
                        <span className={style.span3}>{item.information} </span>
                    </div>
                    <div className={style.absoluteEdit}>
                        { isUser ?
                            <GroupIcoButtons
                                secondIcoTo={"edit"}
                                secondIco={<Edit color={"white"} />}
                            />
                            : <></>
                        }
                    </div>

                </div>
            </div>
        </MDiv>
    );
    else return <MainLoader />
}

export default ItemPage;
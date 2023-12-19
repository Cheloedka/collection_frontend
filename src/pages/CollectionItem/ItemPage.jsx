import React, {useContext, useEffect, useState} from 'react';
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
import RightDivsBlock from "../../components/RightInfo/RightDivsBlock";
import defaultItemImage from '../../images/imageNotFound.png'
import Delete from "../../components/UI/svg/Delete";
import MessageModal from "../../components/UI/modal/MessageModal";
import MDivWithSpans from "../../components/UI/div/MDivWithSpans";
import CommentaryList from "../../components/Commentary/CommentaryList";
import CommentaryInput from "../../components/Commentary/CommentaryInput";
import MDropdown from "../../components/UI/dropdown/MDropdown";
import {AuthContext} from "../../context";

function ItemPage() {
    const params = useParams()
    const navigate = useNavigate()
    const isUser = useIsCurrentUser()
    const {isAuth} = useContext(AuthContext)

    const [item, setItem] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [newCommentaries, setNewCommentaries] = useState([])
    const [coverImage, setCoverImage] = useState("")
    const [sortTypeCommentaries, setSortTypeCommentaries] = useState("id")

    const [itemFetch, isLoading, error] = useFetching(async () => {
        const response = await ItemService.getItem(params.idCollection, params.idItem, params.username)

        if (response.private === true && isUser === false)
            navigate("/error")
        else {
            setItem(response)
        }

        setCoverImage(response.images[0].name)
    })



    useEffect(() => {
        if (params.idCollection >= 0 && params.idItem >=0) //checks if entered in link id is a number, not string
            itemFetch()
        else
            navigate("/error")
    },[params.idItem])

    useEffect(() => {
        if (error)
            navigate("/error")
    }, [error])

    async function deleteItem() {
        await ItemService.deleteItem(item.itemId)
        navigate("/" + params.username + "/" + params.idCollection)
    }



    if (item)
        return (
            <>
                <MDiv className={style.opacityBannerDiv}>
                    <div className={style.divMainContent}>
                        <div className={style.divContentWithoutEditIco}>
                            {item?.images.length > 0
                                ? <ItemImagesMap images={item.images} defaultImage={coverImage ? coverImage : defaultItemImage}/>
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
                                    firstIco={
                                    <div onClick={() => setModalVisible(true)}>
                                        <Delete />
                                    </div>
                                    }
                                    secondIcoTo={"/" + params.username +
                                        "/" + params.idCollection +
                                        "/" + params.idItem + "/edit"}
                                    secondIco={<Edit color={"white"} />}
                                />
                                : <></>
                            }
                        </div>

                        <MessageModal visible={modalVisible}
                                      setVisible={setModalVisible}
                                      acceptCallback={() => deleteItem()}
                        >
                            Are you sure to delete Item?
                        </MessageModal>

                    </div>
                    <div className={style.likesCount}>
                        <span className={style.span2}>{item.likesCount}</span>
                        <Like width={"14px"}/>
                    </div>
                </MDiv>
                <div className={style.bottomSection}>
                    <MDivWithSpans
                        mainText={"Comments"}
                        className={style.leftComments}
                    >
                        { isAuth ?
                            <div className={style.divCommentaryInput}>
                                <CommentaryInput setNewCommentaries={setNewCommentaries} idItem={item.itemId}/>
                            </div>
                            : <></>
                        }

                        <div className={style.dropdownSort}>
                            <MDropdown
                                defaultValue={"Sorting By"}
                                options={[
                                    {title: "Popular", type: "countLikes", onClick: setSortTypeCommentaries},
                                    {title: "New", type: "creationDate", onClick: setSortTypeCommentaries},
                                ]}
                            />
                        </div>

                        { newCommentaries
                            ? <CommentaryList commentaries={newCommentaries} idPost={item.itemId}/>
                            : <></>
                        }
                        <CommentaryList idPost={item.itemId} sort={sortTypeCommentaries}/>

                    </MDivWithSpans>

                    <div className={style.rightInfo}>
                        <RightDivsBlock link={"/" + params.username + "/" + params.idCollection}/>
                    </div>
                </div>
            </>
        );
    else return <MainLoader />
}

export default ItemPage;
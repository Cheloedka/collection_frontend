import CollectionItemPostList from "../components/CollectionItemPost/CollectionItemPostList";
import {useContext, useEffect, useState} from "react";
import {AuthContext, UserContext} from "../context";
import style from "./Main.module.css"
import RightInfo from "../components/RightInfo/RightInfo";
import {useFetching} from "../hooks/useFetching";
import CollectionService from "../API/CollectionService";
import {useNavigate} from "react-router-dom";
import {getCollectionImage, getImage} from "../functions/imageFunctions";
import LoaderAndErrorDiv from "../components/structureComponents/LoaderAndErrorDiv";

function Main() {

    const {isAuth} = useContext(AuthContext)
    const {username} = useContext(UserContext)
    const navigate = useNavigate()

    const [collections, setCollections] = useState([])

    const [rightDivFetch, isLoading, error] = useFetching( async () => {
        const request = await CollectionService.getTop3Collection(username ? username : "notAuth")
        setCollections(request)
    })

    useEffect(() => {
        rightDivFetch()
    }, [isAuth, username])

    return (
        <div className={style.main}>
            <LoaderAndErrorDiv isLoading={isLoading} error={error} />
            <div className={style.left}>
                { isAuth && username ?
                    <>
                        <CollectionItemPostList username={username} type="FOLLOWER" />
                    </>
                    : <></>
                }
                <CollectionItemPostList type="MAIN" />
            </div>

            <div className={style.right}>
                { collections ?
                    <div className={style.rightDivs}>
                        { collections.map( (c, index) =>
                            <RightInfo
                                key={index}
                                image={getCollectionImage(c.image)}
                                text1={c.name}
                                text2={c.about}
                                onClick={() => navigate("/" + c.author + "/" + c.id)}
                            />
                        )}

                    </div>
                    :<></>
                }
            </div>

        </div>
    );
}

export default Main;
import React, {useContext} from 'react';
import CollectionPageItem from "./CollectionPageItem";
import style from "./CollectionPageItemsList.module.css"
import {getCollectionImage} from "../../../functions/imageFunctions";
import {Link} from "react-router-dom";
import {UserContext} from "../../../context";

function CollectionPageItemsList({items, idCollection}) {
    const {username} = useContext(UserContext)
    return (
        <div className={style.mainDivList}>

            {items
                .sort((x, y) => x.countId - y.countId)
                .map((c, index) =>
                <Link to={"/" + username + "/" + idCollection + "/" + c.countId} key={index}>
                    <CollectionPageItem
                        key={index}
                        img={getCollectionImage(c.itemImage)}
                        text1={c.itemName}
                        text2={c.itemAbout}
                        id={c.itemId}
                        isLiked={c.liked}
                    />
                </Link>
            )
            }
        </div>
    );
}

export default CollectionPageItemsList;
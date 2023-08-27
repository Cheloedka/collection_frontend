import React from 'react';
import CollectionItem from "./CollectionItem";
import style from './CollectionItem.module.css'
import useIsCurrentUser from "../../../hooks/useIsCurrentUser";

function CollectionItemsList({collections, username}) {
    const isUser = useIsCurrentUser()

    if (!collections.length) {
        return (
            <div>
                There is no any collections
            </div>
        )
    }

    return (
        <div className={style.divCollections}>
            {collections.map((c, index) =>
                <React.Fragment key={index}>
                { c.private === false || isUser ?
                    <CollectionItem
                        name={c.name}
                        about={c.about}
                        img={c.image}
                        username={username}
                        id={c.idCollection}
                    />
                    : <></>
                }
                </React.Fragment>
            )}
        </div>
    );
}

export default CollectionItemsList;
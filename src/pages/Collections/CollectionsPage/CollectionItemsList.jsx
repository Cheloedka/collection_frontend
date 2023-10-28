import React from 'react';
import CollectionItem from "./CollectionItem";
import style from './CollectionItem.module.css'
import useIsCurrentUser from "../../../hooks/useIsCurrentUser";

function CollectionItemsList({collections}) {

    if (!collections?.length) {
        return (
            <div>
                There is no any collections
            </div>
        )
    }

    return (
        <div className={style.divCollections}>
            {collections.map(({name, about, image, id, countItems}, index) =>
                <React.Fragment key={index}>
                    <CollectionItem
                        name={name}
                        about={about}
                        img={image}
                        id={id}
                        count={countItems}
                    />
                </React.Fragment>
            )}
        </div>
    );
}

export default CollectionItemsList;
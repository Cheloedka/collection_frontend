import React from 'react';
import CollectionElement from "./CollectionElement";
import style from "./CollectionElementList.module.css"

function CollectionElementList({collection}) {
    return (
        <div className={style.mainDivList}>
            <CollectionElement
                img={collection.image}
                text1={collection.name}
                text2={collection.about}
            />
            <CollectionElement
                img={collection.image}
                text1={collection.name}
                text2={collection.about}
            />
            <CollectionElement
                img={collection.image}
                text1={collection.name}
                text2={collection.about}
            />
            <CollectionElement
                img={collection.image}
                text1={collection.name}
                text2={collection.about}
            />
            <CollectionElement
                img={collection.image}
                text1={collection.name}
                text2={collection.about}
            />
        </div>
    );
}

export default CollectionElementList;
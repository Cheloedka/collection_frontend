import React from 'react';
import CollectionElement from "./CollectionElement";

function CollectionElementList({collection}) {
    return (
        <div style={{display: "flex", gap: "30px"}}>
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
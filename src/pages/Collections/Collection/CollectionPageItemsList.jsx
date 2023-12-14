import {useState} from 'react';
import CollectionPageItem from "./CollectionPageItem";
import style from "./CollectionPageItemsList.module.css"
import {getCollectionImage} from "../../../functions/imageFunctions";

function CollectionPageItemsList({items, idCollection}) {

    const [showMoreItems, setShowMoreItems] = useState(false)


    return (
        <div>
            <div className={style.mainDivList}>

                {items
                    .slice(0, showMoreItems ? items.length : 5)
                    .sort((x, y) => x.countId - y.countId)
                    .map((c, index) =>
                        <CollectionPageItem
                            key={index}
                            img={getCollectionImage(c.itemImage)}
                            text1={c.itemName}
                            text2={c.itemAbout}
                            countID={c.countId}
                            idCollection={idCollection}
                        />
                    )
                }
            </div>

            { items.length > 5 ?
                <> { showMoreItems?
                    <div
                        className={style.showMoreBtn}
                        onClick={() => setShowMoreItems(false)}
                    >
                        Show less
                    </div> :
                    <div
                        className={style.showMoreBtn}
                        onClick={() => setShowMoreItems(true)}
                    >
                        Show more
                    </div>
                } </>
                : <> </>
            }



        </div>

    );
}

export default CollectionPageItemsList;
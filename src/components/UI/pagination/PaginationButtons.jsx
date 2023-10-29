import React, {useState} from 'react';
import style from "./PaginationButtons.module.css";

function PaginationButtons({pageNumber, buttons}) {

    const [activePage, setActivePage] = useState(0)
    function changeActivePage(page) {
        setActivePage(page)
        pageNumber(page)
    }

    const styles = (page) => {
        return page === activePage ? style.buttonActive : style.buttonNotActive;
    }

    return (
        <div className={style.navDivButtons}>

            { buttons.map( (b, index) =>
                <div
                    key={index}
                    className={styles(index)}
                    onClick={() => changeActivePage(index)}
                >
                    {b.title}
                </div>
            )}
        </div>
    );
}

export default PaginationButtons;
import React, {useState} from 'react';
import style from "./SettingsNavButtons.module.css";

function SettingsNavButtons({pageNumber}) {

    const [activePage, setActivePage] = useState(1)
    function changeActivePage(page) {
        setActivePage(page)
        pageNumber(page)
    }

    const styles = (page) => {
        return page === activePage ? style.ButtonActive : "";
    }

    return (
        <div className={style.navDivButtons}>
            <div
                className={styles(1)}
                onClick={() => changeActivePage(1)}
            >
                Account
            </div>
            <div
                className={styles(2)}
                onClick={() => changeActivePage(2)}
            >
                Security
            </div>
            <div
                className={styles(3)}
                onClick={() => changeActivePage(3)}
            >
                Profile
            </div>
        </div>
    );
}

export default SettingsNavButtons;
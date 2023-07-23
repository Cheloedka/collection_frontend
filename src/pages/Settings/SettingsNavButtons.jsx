import React, {useState} from 'react';
import style from "./SettingsNavButtons.module.css";

function SettingsNavButtons({pageNumber}) {

    const[activePage, setActivePage] = useState({
        1: style.ButtonActive,
        2: '',
        3: ''
    })

    function changeActivePage(page) {
        let empty = {
            1: '',
            2: '',
            3: ''
        }
        pageNumber(page)
        empty[page] = style.ButtonActive
        setActivePage(empty)
    }




    return (
        <div className={style.navDivButtons}>
            <div className={activePage[1]} onClick={() => changeActivePage(1)}>
                Account
            </div>
            <div className={activePage[2]} onClick={() => changeActivePage(2)}>
                Security
            </div>
            <div className={activePage[3]} onClick={() => changeActivePage(3)}>
                Profile
            </div>
        </div>
    );
}

export default SettingsNavButtons;
import React from 'react';
import style from "./NavButton.module.css";
import Search from "../../../images/icons/Search.svg";

function SearchButton({...props}) {

    return (
        <button
            {...props}
            className={style.searchButton}
        >
            <img src={Search} className={style.icon} alt={"icon"}/>
        </button>
    );
}

export default SearchButton;
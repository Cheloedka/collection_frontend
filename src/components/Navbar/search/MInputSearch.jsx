import React from 'react';
import style from "./MInputSearch.module.css";
import Search from "../../../images/icons/Search.svg";
import {useStyles} from "../../../hooks/useStyles";

function MInputSearch({value, setValue, onClick, className}) {

    const styles = useStyles(style.divFlex, className)

    return (
        <div className={styles}>
            <button
                className={style.search}
                onClick={onClick ? onClick : null}
            >
                <img
                    src={Search}
                    className={style.searchIco}
                />
            </button>
            <input
                value={value}
                onKeyUp={e => e.key === 'Enter' && (onClick ? onClick() : null)}
                onChange={e => setValue(e.target.value)}
                placeholder="Search"
                className={style.MInputSearchNav}
            />
        </div>
    );
}

export default MInputSearch;
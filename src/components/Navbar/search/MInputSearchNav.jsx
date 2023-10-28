import React from 'react';
import style from './MInputSearchNav.module.css'
import Search from '../../../images/icons/Search.svg'
import {useStyles} from "../../../hooks/useStyles";

function MInputSearchNav({className, value, setValue}) {

    const styles = useStyles(style.divFlex, className)

    return (
        <div className={styles}>
            <div className={style.search}>
                <img
                    src={Search}
                    className={style.searchIco}
                />
            </div>
            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Search"
                className={style.MInputSearchNav}
            />
        </div>
    );
}

export default MInputSearchNav;

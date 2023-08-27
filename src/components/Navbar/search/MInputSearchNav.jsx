import React from 'react';
import style from './MInputSearchNav.module.css'
import Search from '../../../images/icons/Search.svg'

function MInputSearchNav({className}) {

    return (
        <div className={className}>
            <div className={style.divFlex}>
                <div className={style.search}>
                    <img
                        src={Search}
                        className={style.searchIco}
                    />
                </div>
                <input
                    placeholder="Search"
                    className={style.MInputSearchNav}
                />
            </div>
        </div>
    );
}

export default MInputSearchNav;

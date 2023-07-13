import React from 'react';
import style from './NavButton.module.css'
import {Link} from 'react-router-dom';


function NavButton({to, src}) {

    return (
        <Link className={style.navButton} to={to}>
            <img src={src} className={style.icon} alt={"icon"}/>
        </Link>
    );
}

export default NavButton;
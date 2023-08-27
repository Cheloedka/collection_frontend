import React, {useContext} from 'react';
import style from './NavDrop.module.css'
import polygon from '../../../images/icons/Polygon.svg'
import {UserContext} from "../../../context";
import {Link} from "react-router-dom";
import {useLogout} from "../../../hooks/useLogout";
import CollectionsIco from "../../UI/svg/CollectionsIco";
import Settings from "../../UI/svg/Settings";
import Home from "../../UI/svg/Home";
import Logout from "../../UI/svg/Logout";
import Community from "../../UI/svg/Community";
import Friends from "../../UI/svg/Friends";

function NavDrop() {
    const logout = useLogout()
    const {username, userImage} = useContext(UserContext)

    const buttons = [
        {image: <Home />, label: "Home", to: '/' + username},
        {image: <CollectionsIco />, label: "Collections", to: '/' + username + '/collections'},
        {image: <Settings/>, label: "Settings", to: '/settings'},
        {image: <Friends />, label: "Following", to: '/info'},
        {image: <Community />, label: "Community", to: '/info'}
    ]

    return (

        <div className={style.dropdown}>
            <button className={style.toggle}>
                <img
                    className={style.imgUser}
                    src={userImage}
                    alt={username}
                />
                <div className={style.divUsername}>
                    {username}
                </div>
                <img
                    className={style.polygon}
                    src={polygon}
                    alt={""}
                />
            </button>

            <div className={style.menu}>
                {buttons.map((c, index) =>
                    <Link
                        className={style.item}
                        to={c.to}
                        key={index}
                    >
                        {c.image ?
                            <div className={style.icon}>
                                {c.image}
                            </div>
                            : <></>}
                        {c.label}
                    </Link>
                )}

                <button
                    className={style.item}
                    onClick={logout}
                    style={{color: "red"}}
                >
                    <div className={style.icon}>
                        <Logout/>
                    </div>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default NavDrop;
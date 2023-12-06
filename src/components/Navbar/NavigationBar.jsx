import Navbar from 'react-bootstrap/Navbar';
import {Image} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context";
import M1Button from "../UI/button/M1Button";
import NavDrop from "./dropdown/NavDrop";
import SearchDiv from "./search/SearchDiv";
import style from './NavigationBar.module.css'
import logo from "../../images/logo.png"
import Bell from '../../images/icons/Notification.svg'
import Search from "../../images/icons/Search.svg";
import Tooltip from "../UI/tooltip/Tooltip";

function NavigationBar() {

    const {isAuth} = useContext(AuthContext)
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false);

    function BLogin(e) {
        e.preventDefault()
        navigate('/login')
    }

    return (
    <Navbar className={style.NavigationBar} >

        <div className={style.divNavbar}>
            <div className={style.brand}>
                <Image src={logo} className={style.logo}/>
                . . .Collections
            </div>

            <SearchDiv
                className={style.searchForm}
                setShowModal={setShowModal}
                showModal={showModal}
            />

            <button
                onClick={() => setShowModal(true)}
                className={style.searchButton}
            >
                <img src={Search} className={style.icon} alt={"icon"}/>
            </button>

        </div>


        <div className={style.rightDiv}>
            <Tooltip
                direction={"bottom"}
                text={"Notification"}
            >
                <Link className={style.navButton} to="/">
                    <img src={Bell} className={style.icon} alt={"icon"}/>
                </Link>
            </Tooltip>

            <div className={style.dropdown}>
                { isAuth
                    ? <NavDrop />
                    :
                    <M1Button onClick={BLogin} className={style.buttonLogin}>
                        Login
                    </M1Button>
                }
            </div>
        </div>
    </Navbar>
    );
}

export default NavigationBar;

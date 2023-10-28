import Navbar from 'react-bootstrap/Navbar';
import {Image} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context";
import M1Button from "../UI/button/M1Button";
import MModalSearch from "./search/MModalSearch";
import NavDrop from "./dropdown/NavDrop";
import MInputSearchNav from "./search/MInputSearchNav";
import style from './NavigationBar.module.css'
import logo from "../../images/logo.png"
import Bell from '../../images/icons/Notification.svg'
import Search from "../../images/icons/Search.svg";

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

            <MInputSearchNav className={style.searchForm}/>

            <MModalSearch setShowModal={setShowModal} visible={showModal}>
                <MInputSearchNav/>
            </MModalSearch>

            <button
                onClick={() => setShowModal(true)}
                className={style.searchButton}
            >
                <img src={Search} className={style.icon} alt={"icon"}/>
            </button>

        </div>


        <div className={style.rightDiv}>

            <Link className={style.navButton} to="/">
                <img src={Bell} className={style.icon} alt={"icon"}/>
            </Link>


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

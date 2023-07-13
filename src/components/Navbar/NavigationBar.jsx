import Navbar from 'react-bootstrap/Navbar';
import {Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context";
import M1Button from "../UI/button/M1Button";
import MModalSearch from "./search/MModalSearch";
import SearchButton from "./button/SearchButton";
import NavDrop from "./dropdown/NavDrop";
import MInputSearchNav from "./search/MInputSearchNav";
import style from './NavigationBar.module.css'
import logo from "../../images/logo.png"
import NavButton from "./button/NavButton";
import Bell from '../../images/icons/Notification.svg'
import Home from '../../images/icons/Home.svg'
import Community from '../../images/icons/Community.svg';


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

                <div className={style.leftDiv}>
                    <NavButton to="/userPage" src={Home} />  {/*Home*/}
                    <NavButton to="/userPage" src={Community} />  {/*Communities*/}


                    <div>
                        <MInputSearchNav className={style.searchForm}/>

                        <MModalSearch setShowModal={setShowModal} visible={showModal}>
                            <MInputSearchNav/>
                        </MModalSearch>

                        <SearchButton onClick={() => setShowModal(true)} />
                    </div>

                </div>
        </div>


        <div className={style.rightDiv}>

            <NavButton to="/" src={Bell} />  {/*Bell*/}

            <div className={style.dropdown}>
                {isAuth
                    ?
                    <NavDrop/>
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

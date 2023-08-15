import {Route, Routes} from "react-router-dom";
import Login from "../pages/Login/Login"
import OnlyPublicRotes from "./OnlyPublicRotes";
import {useContext} from "react";
import {AuthContext} from "../context";
import Info from "../pages/Info";
import PrivateRoutes from "./PrivateRoutes";
import UserPage from "../pages/UserPage/UserPage";
import Register from "../pages/Register/Register";
import PostPage from "../pages/Register/PostPage";
import Error404 from "../pages/Error404";
import SettingsPage from "../pages/Settings/SettingsPage";
import CollectionsPage from "../pages/Collections/CollectionsPage";
import MainLoader from "../components/UI/loader/MainLoader";
import CollectionCreator from "../pages/Collections/CollectionCreator";
import CollectionPage from "../pages/Collections/Collection/CollectionPage";
import FollowingPage from "../pages/Following/FollowingPage";

function MainRoutes() {

    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <MainLoader />
    }

    return (
        <Routes>

            {/*Only Public*/}
            <Route path='' element={<OnlyPublicRotes auth={isAuth} />}>
                <Route path='/login' element={<Login />} />
                <Route path='/registration' element={<Register /> } />
            </Route>

            {/*Only Private Routes*/}
            <Route path='' element={<PrivateRoutes auth={isAuth} />}>
                <Route path='/settings' element={<SettingsPage />}/>
                <Route path='/collections/create' element={<CollectionCreator />} />
            </Route>

            {/*All Routes*/}

            <Route path='/confirmation/:id' element={<PostPage/>} />
            <Route path='/resetMail/:id' element={<PostPage/>} />
            <Route path='/newMail/:id' element={<PostPage/>} />

            <Route path='/:username'>
                <Route index element={<UserPage />} />
                <Route path='collections' element={<CollectionsPage />} />
                <Route path=':id' element={<CollectionPage />} />
                <Route path='following' element={<FollowingPage />} />
            </Route>

            <Route path='/info' element={<Info />} />
            <Route path='/error' element={<Error404 />} />


        </Routes>
        
    );
}

export default MainRoutes;
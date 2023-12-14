import {Route, Routes} from "react-router-dom";
import Login from "../pages/Login/Login"
import OnlyPublicRotes from "./OnlyPublicRotes";
import {useContext} from "react";
import {AuthContext} from "../context";
import Main from "../pages/Main";
import PrivateRoutes from "./PrivateRoutes";
import UserPage from "../pages/UserPage/UserPage";
import Register from "../pages/Register/Register";
import PostPage from "../pages/Register/PostPage";
import Error404 from "../pages/Error404";
import SettingsPage from "../pages/Settings/SettingsPage";
import CollectionsPage from "../pages/Collections/CollectionsPage/CollectionsPage";
import MainLoader from "../components/UI/loader/MainLoader";
import CollectionCreator from "../pages/Collections/CreatorsEditors/Creators/CollectionCreator";
import CollectionPage from "../pages/Collections/Collection/CollectionPage";
import FollowingPage from "../pages/Following/FollowingPage";
import PasswordReset from "../pages/Login/PasswordReset";
import PostPasswordPage from "../pages/Register/PostPasswordPage";
import CollectionItemCreator from "../pages/Collections/CreatorsEditors/Creators/CollectionItemCreator";
import CollectionEditor from "../pages/Collections/CreatorsEditors/Editors/CollectionEditor";
import ItemPage from "../pages/CollectionItem/ItemPage";
import CollectionItemEditor from "../pages/Collections/CreatorsEditors/Editors/CollectionItemEditor";

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
                <Route path='/resetPassword' element={<PasswordReset />} />
            </Route>

            {/*Only Private Routes*/}
            <Route path='' element={<PrivateRoutes auth={isAuth} />}>
                <Route path='/settings' element={<SettingsPage />}/>
                <Route path='/:username/collections/create' element={<CollectionCreator />} />
                <Route path='/:username/:idCollection/item/create' element={<CollectionItemCreator />} />
                <Route path='/:username/:idCollection/edit' element={<CollectionEditor />} />
                <Route path='/:username/:idCollection/:idItem/edit' element={<CollectionItemEditor />} />
            </Route>

            {/*All Routes*/}

            <Route path='/confirmation/:id' element={<PostPage/>} />
            <Route path='/resetMail/:id' element={<PostPage/>} />
            <Route path='/newMail/:id' element={<PostPage/>} />
            <Route path='/resetPwd/:id' element={<PostPasswordPage/>} />

            <Route path='/:username'>  {/*nickname*/}
                <Route index element={<UserPage />} />
                <Route path='collections' element={<CollectionsPage />} />
                <Route path=':idCollection' element={<CollectionPage />} />
                <Route path=':idCollection/:idItem' element={<ItemPage />} />
                <Route path='following' element={<FollowingPage />} />
            </Route>

            <Route path='/main' element={<Main />} />
            <Route path='/not_found' element={<Error404 />} />


        </Routes>
        
    );
}

export default MainRoutes;
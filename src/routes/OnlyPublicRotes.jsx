import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

function OnlyPublicRotes({auth}) {

    return auth
        ? <Navigate to="/info" />
        : <Outlet />

}

export default OnlyPublicRotes;
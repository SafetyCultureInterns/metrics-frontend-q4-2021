import React from "react";
import {Route, Routes} from "react-router-dom"

import {Home} from "../components/Home/Home";
import {NotFound} from "../components/NotFound/NotFound";
import {Login} from "../components/Login/Login";
import {RequireAuth} from "../hooks/auth";

export const MetricsRouter = () => {
    return (
        <Routes>
            <Route exact path={"/login"} element={<Login/>}/>
            <Route path={"/"} element={<RequireAuth><Home/></RequireAuth>}/>
            <Route exact path={"home"} element={<Home/>}/>
            <Route path={"*"} element={<NotFound/>}/>
        </Routes>
    )
}

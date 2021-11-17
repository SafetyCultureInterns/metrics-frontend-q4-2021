import React from "react";
import {Route, Routes} from "react-router-dom"

import {Home} from "../components/Home/Home";
import {NotFound} from "../components/NotFound/NotFound";

export const MetricsRouter = () => {
    return (
        <Routes>
            <Route path={"/"} element={<Home/>}>
                <Route exact path={"home"} element={<Home/>}/>
            </Route>
            <Route path={"*"} element={<NotFound/>}/>
        </Routes>
    )
}

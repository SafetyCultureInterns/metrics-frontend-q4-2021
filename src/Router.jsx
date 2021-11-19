import React from "react";
import { Navigate, Route, Routes } from "react-router-dom"

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import { AuthGuard } from "./hooks/auth";

export const MetricsRouter = () => {
    return (
        <Routes>
            <Route
                exact
                path="/home"
                element={<AuthGuard><Home/></AuthGuard>}
            />
            <Route
                path="/"
                element={<AuthGuard><Home/></AuthGuard>}
            />
            <Route
                exact
                path="/login"
                element={<Login/>}
            />
            <Route
                exact
                path="/register"
                element={<Register/>}
            />
            <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes>
    )
}

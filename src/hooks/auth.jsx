import * as React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const authContext = React.createContext();

export function RequireAuth({children}) {
    const {authed} = useAuth()
    const Navigate = useNavigate()

    return authed === true
    ? children
        : <Navigate to="/login" replace />
}

export function useAuth() {
    const [authed, setAuthed] = React.useState(false);

    return {
        authed,
        login() {
            return axios.post("/loginURL", {})
                .then((res) => {
                    res.data.json()
                    setAuthed(true)
                })
        },
        logout() {
            return axios.post("/logoutURL", {})
                .then((res) => {
                    res.data.json()
                    setAuthed(false)
                })
        }
    };
}

export function AuthProvider({children}) {
    const auth = useAuth();

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export default function AuthConsumer() {
    return React.useContext(authContext);
}

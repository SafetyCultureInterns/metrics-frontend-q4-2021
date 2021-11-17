import axios from "axios";

export function Login() {
    return axios.post("/loginURL", {}).then(res => res.data.json())
}

export function Logout() {
    return axios.post("/logoutURL", {}).then(res => res.data.json())
}

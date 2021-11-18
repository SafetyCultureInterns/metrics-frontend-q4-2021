import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const REFRESH_TOKEN_KEY = "auth/refresh_token";
const ACCESS_TOKEN_KEY = "auth/access_token";

const authContext = createContext();

export function AuthGuard({ children }) {
    // Return an component that will either render our provided component or navigate to the login route
    const [authenticated] = useAuth();
    const navigate = useNavigate();
    if (!authenticated) {
        navigate("/login");
        return <></>;
    }
    return <>{children}</>
}

export function useAuth() {
    const navigate = useNavigate();

    const [refresh_token, setRefreshToken] = useState(localStorage.getItem(REFRESH_TOKEN_KEY));
    const [access_token, setAccessToken] = useState(localStorage.getItem(ACCESS_TOKEN_KEY));

    const [authenticated, setAuthenticated] = useState(!!access_token);

    const updateRefreshToken = (tok) => {
        if (tok) {
            localStorage.setItem(REFRESH_TOKEN_KEY, tok);
            setAuthenticated(true);
        } else {
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            setAuthenticated(false);
        }
        setRefreshToken(tok);
    };

    const updateAccessToken = (tok) => {
        if (tok) {
            localStorage.setItem(ACCESS_TOKEN_KEY, tok);
        } else {
            localStorage.removeItem(ACCESS_TOKEN_KEY)
        }
        setAccessToken(tok);
    };

    const refreshAccessToken = async () => {
        try {
            const { data } = await axios.post("/auth/refresh", {
                token: refresh_token
            });
            const { access_token } = data;
            updateAccessToken(access_token);
            return access_token;
        } catch {
            updateRefreshToken();
            updateAccessToken();
        }
    };

    /**
     * Performs a request using the current access token. Refreshes the token if necessary
     * @param request {Function<Promise<any>>} the request to be performed using the access token
     * @return {Promise<void>}
     */
    const authenticatedRequest = async (request) => {
        try {
            return await request(access_token);
        } catch (err) {
            if (err.response.code === 401) {
                const newToken = await refreshAccessToken();
                return await request(newToken);
            } else {
                updateRefreshToken();
                updateAccessToken();
            }
        }
    };

    console.log("RETURNING NEW HOOK VALUES");
    console.log(authenticated);
    return [
        authenticated,
        {
            authenticatedRequest,
            /**
             * Login will attempt to log into the server with the provided credentials
             * @param email {string} an email address to sign in using
             * @param password {string} the matching password for the email address
             * @return {Promise<void>}
             */
            async login({
                            email,
                            password
                        }) {
                const { data } = await axios.post("/auth/login", {
                    email,
                    password
                });
                const { refresh_token, access_token } = data;
                updateRefreshToken(refresh_token);
                updateAccessToken(access_token);
                navigate("/home");
            },
            /**
             * Register will attempt to create a new account in the system
             * @param name
             * @param email
             * @param password
             * @return {Promise<void>}
             */
            async register({
                               name,
                               email,
                               password
                           }) {
                const { data } = await axios.post("/auth/register", {
                    name,
                    email,
                    password,
                });

                const { access_token, refresh_token } = data;
                updateRefreshToken(refresh_token);
                updateAccessToken(access_token);
            },

            /**
             * Logout will revoke the current session
             * @return {Promise<void>}
             */
            async logout() {
                await authenticatedRequest(async (token) => {
                    await axios.post("/auth/logout", {}, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                })
                updateRefreshToken();
                updateAccessToken();
                navigate('/login')
            }
        }];
}

export function AuthProvider({ children }) {
    const auth = useAuth();

    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

export default function AuthConsumer() {
    return useContext(authContext);
}

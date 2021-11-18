import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const REFRESH_TOKEN_KEY = "auth/refresh_token";
const ACCESS_TOKEN_KEY = "auth/access_token";

const authContext = createContext();

export function AuthProvider({children}) {
    const navigate = useNavigate();

    const [refreshToken, setRefreshToken] = useState(localStorage.getItem(REFRESH_TOKEN_KEY));
    const [accessToken, setAccessToken] = useState(localStorage.getItem(ACCESS_TOKEN_KEY));

    const updateRefreshToken = (token) => {
        token ? localStorage.setItem(REFRESH_TOKEN_KEY, token) : localStorage.removeItem(REFRESH_TOKEN_KEY);
        setRefreshToken(token);
    };
    const updateAccessToken = (token) => {
        token ? localStorage.setItem(ACCESS_TOKEN_KEY, token) : localStorage.removeItem(ACCESS_TOKEN_KEY);
        setAccessToken(token);
    };

    const finalizeAuthenticate = (refresh, access) => {
        updateRefreshToken(refresh);
        updateAccessToken(access);
        navigate("/home");
    }

    // We need to be able to clean the session when it is done
    const cleanSession = () => {
        updateRefreshToken();
        updateAccessToken();
        navigate("/login")
    };

    const refreshAccessToken = async () => {
      try {
          const { data } = await axios.post("/auth/refresh", {
              token: refreshToken
          });
          const { access_token } = data;
          updateAccessToken(access_token);
          // Return the access token so it can be used immediately
          return access_token;
      } catch {
          // If attempting to refresh the access token fails, redirect to the login page
          cleanSession();
      }
    };

    /**
     * Performs a request using the current access token. Refreshes the token if necessary
     * @param request {Function<Promise<any>>} the request to be performed using the access token
     * @return {Promise<void>}
     */
    const authenticatedRequest = async (request, opts = {}) => {
        try {
            return await request(opts.accessToken || accessToken);
        } catch (err) {
            if (!opts.attempt && (err?.response?.status === 401 || err?.response?.code === 401)) {
                const newAccessToken = await refreshAccessToken();
                return await authenticatedRequest(request, { attempt: 1, accessToken: newAccessToken });
            }
            // Non-401 error received, return it to the user.
            throw err;
        }
    };

    const auth = {
        isAuthenticated: !!refreshToken,
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
            finalizeAuthenticate(refresh_token, access_token);
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
            finalizeAuthenticate(refresh_token, access_token);
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
            cleanSession();
        }
    };

    return (
        <authContext.Provider value={auth}>{children}</authContext.Provider>
    )
}

export function AuthGuard({ children }) {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate("/login");
        return <></>;
    }

    return <>{children}</>;
}

export function useAuth() {
    return useContext(authContext);
}

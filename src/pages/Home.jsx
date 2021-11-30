import { useState, useEffect } from "react"
import axios from "axios";
import { useAuth } from "../hooks/auth";
import "../App.css";

export const Home = () => {
    const { authenticatedRequest } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [account, setAccount] = useState(null);


    useEffect(() => {
        authenticatedRequest(async (token) => {
            const { data } = await axios.get('/auth/context', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });



            setAccount(data);
            setIsLoading(false);
        });
    }, [authenticatedRequest]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (<>Welcome to the app {account.account_name}
    <br/><br/> This is the metrics front end that displays information
    </>);
}

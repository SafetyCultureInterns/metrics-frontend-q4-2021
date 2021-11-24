import { useState, useEffect } from "react"
import axios from "axios";
import { useAuth } from "../hooks/auth";

export const Home = () => {
    const { authenticatedRequest } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [context, setContext] = useState(null);
    const [newData, setNewData] = useState(null);

    useEffect(() => {
        authenticatedRequest(async (token) => {
            const { data } = await axios.get('/auth/context', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const { newData } = await axios.get('/services').then(res => {
                const newData = JSON.stringify(res.data);
                console.log(newData)
                setNewData(newData)
                return newData;
            })

            setContext(data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (<>Welcome to the app {context.account_name} and these are our services: {newData}</>);
}

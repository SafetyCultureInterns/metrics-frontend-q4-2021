import { useState, useEffect } from "react"
import axios from "axios";
import { useAuth } from "../hooks/auth";

export const Home = () => {
    const { authenticatedRequest } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [account, setAccount] = useState(null);
    const [newData, setNewData] = useState(null);
    const [pingData, setPingData] = useState(null);

    useEffect(() => {
        authenticatedRequest(async (token) => {
            const { data } = await axios.get('/auth/context', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            await axios.get('/services').then(res => {
                const newData = JSON.stringify(res.data);
                setNewData(newData)
                return newData;
            });

            await axios.get('/metrics/input').then(res => {
                console.log(res);
                const pingData = res.data;
                setPingData(pingData)
                return pingData;
            });

            setAccount(data);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (<>Welcome to the app {account.account_name} and these are our services: {newData} 
    <br/><br/>Your pod name is: {pingData.pod_id}
    <br/><br/>Your service is: {pingData.service_type}
    <br/><br/>Your timestamp is: {pingData.ts}
    <br/><br/>Your http status codes are: {JSON.stringify(pingData.http_status)}
    <br/><br/>Your Average Latency is: {pingData.avg_latency}
    <br/><br/>Your 99th Percentile is: {pingData.percentile_99} </>);
}

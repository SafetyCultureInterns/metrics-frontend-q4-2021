import { useState, useEffect } from "react"
import axios from "axios";
import { useAuth } from "../hooks/auth";

import { ViewDate } from "../components/Calendar";
import { SimpleSelect } from "../components/SimpleSelect";
import { SelectServices } from "../components/SelectServices";
import { Checkbox } from "@mui/material";

import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AssistantPhotoIcon from '@mui/icons-material/AssistantPhoto';
import CreditCardIcon from '@mui/icons-material/CreditCard';


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

    const menuItems = [{label:"10 Minutes", value:"tenMinutes"}, {label:"1 Hour", value:"oneHour"},
     {label:"6 Hours", value:"sixHours"}, {label:"12 Hours", value:"twelvehours"}, {label:"24 Hours", value:"oneDay"}]

    const filterMenuItems = [
        {primary: "Status", key: "status"},
        {primary: "Average Latency", key: "avglat"},
        {primary: "Maximum Latency", key: "maxlat"},
        {primary: "Minimum Latency", key: "minlat"},
    ]

    const serviceMenuItems = [ 
     {primary: "Authorization", icon: <LockIcon/>, key: "auth"},
     {primary: "User", icon: <PersonIcon/>, key: "user"},
     {primary: "Carts", icon: <ShoppingCartIcon/>, key: "cart"},
     {primary: "Products", icon: <Inventory2Icon/>, key: "products"},
     {primary: "Suggestions", icon:<AssistantPhotoIcon/>, key: "suggestions"},
     {primary: "Billing", icon: <CreditCardIcon/>, key: "billing"},
    ]
        
    return (<>Welcome to the app {account.account_name} and these are our services: {newData} 
                    <SimpleSelect menuItems={menuItems} title="Time"/>
                    <br></br>
                <ViewDate/>
                <br></br>
                <SelectServices serviceMenuItems={serviceMenuItems} filterMenuItems={filterMenuItems}/>

    </>);
}

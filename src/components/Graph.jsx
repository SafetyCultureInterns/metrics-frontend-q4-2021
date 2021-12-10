import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';



import {Typography, Button} from "@mui/material";

function Graph(){

    const [metricsData, setMetricsData] = useState(null);

    useEffect(() => {
        axios.get('/metrics/test').then(res => {
            // console.log(res)
            const metricsData = res.data;
            setMetricsData(metricsData)
            console.log("LENGTH IS: " + metricsData.length)

        });
    }, []);

  const dataArray = [];
  const updatedDataArray = [];
  const [moreData, setMoreData] = useState(metricsData);


    useEffect(() => {
        if (metricsData && metricsData.length > 0){
            for (let i = 0 ; i < 70; i++) {
                // console.log(metricsData[i].ts)

                dataArray[i] = {
                    name: new Date(metricsData[i].ts ).toLocaleString("en-GB", 
                    {hour: "numeric", minute: "numeric", second: "numeric"}), 
                    Latency: metricsData[i].avg_lat,
                     MaxLatency: metricsData[i].avg_max, 
                     MinLatency: metricsData[i].avg_min,
                    ServiceType: metricsData[i].service_type}
                
                }
                setMoreData(dataArray)
            for (let i = 71; i < 100; i ++){

                updatedDataArray[i] = {
                    name: new Date(metricsData[i].ts ).toLocaleString("en-GB", 
                    {hour: "numeric", minute: "numeric", second: "numeric"}), 
                    Latency: metricsData[i].avg_lat,
                     MaxLatency: metricsData[i].avg_max, 
                     MinLatency: metricsData[i].avg_min,
                    ServiceType: metricsData[i].service_type}

            }    
        }
    },[metricsData])



    
    


 

    const [minLatency, setMinLatency] = useState();

    //Change times from UNIX to readable english
    
    // const timeStamps = moreData.map(time => new Date(time.ts * 1000).toLocaleString("en-US", {hour: "numeric"}))

    // const timeStamps = someStuff.map(time => {
    //     const {ts, service_type} = time;
    // })




  //set initial dataset values
  


// update the dataset values to use a different time frame
slidersfor (i = 4; i >= 4 && i < 10; i++ ) {
    updatedDataArray[(i-4)] = {
        name: timeStamps[i], Latency: backendData[i].avg_latency}
    }  



  const header = backendData[0].service_type.toUpperCase()

  const title = header + ' - Latency Information';

  const [metrics, setMetrics] = useState(dataArray);
  const [graphTitle, setGraphTitle] = useState(title);


return (

    
    <div>
        <Button variant="contained"
            onClick={() => {setMetrics(
            updatedDataArray); 
            {setGraphTitle("This is different data")}}} > Change Data
        </Button>
        
        <Button variant="contained"
            onClick={() => {setMinLatency(
            "MinLatency"); }} > Show Min Latency
        </Button>

        <Button variant="contained"
            onClick={() => {<BarChart width={730} height={250} data={metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Latency" fill="#8884d8" />
              </BarChart> }} > Make a bar graph
        </Button>

        <Typography ml={6.5} variant="h4" component="h2">
            {graphTitle}
        </Typography>
        <LineChart

            width={1200}

            height={400}
            data={moreData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[100, 300]}/>
            <Tooltip />
            <Line
                type='monotone'
                dataKey={'Latency'}
                stroke='#8884d8'
                fill='#8884d8'
            />
            <Line
                type='monotone'
                dataKey={minLatency}
                stroke='#E1341E'
                fill='#8884d8' 
            />



            {/* <Line
                type='monotone'
                dataKey={'amt'}
                stroke='#E1341E'
                fill='#6764d8' 
            /> */}
        </LineChart>
   </div>


)

}


export default Graph


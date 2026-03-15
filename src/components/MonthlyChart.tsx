"use client";

import {useEffect,useState} from "react";
import{
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
}from "recharts";

export default function MonthlyChart(){
    const [data,setData] = useState([]);
    useEffect(()=>{
        fetch("/api/transactions/monthly")
        .then(res => res.json())
        .then(data=>setData(data));
    
    },[]);

    return (
        <div className="mt-10 bg-white p-6 rounded shadow max-w-4xl">
            <h2 className="text-xl font-bold mb-4">Monthly Expenses</h2>
       
        <ResponsiveContainer width = "100%" height = {300}>
            <LineChart data={data} margin={{top:20,right:30,left:20,bottom:5}}>
                <CartesianGrid strokeDasharray= "3 3"/>
                <XAxis dataKey="month" tick = {{fontSize:14}} />
                <YAxis  tick={{fontSize:14}}/>
                <Tooltip formatter={(value)=>[`$${value}`,"Expenses"]}/>
                <Line type="monotone"
                dataKey="total"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{r:6}}
                activeDot={{r:8}}
                animationDuration={800}
                />
                </LineChart>            
        </ResponsiveContainer>
        </div> 
    );
}
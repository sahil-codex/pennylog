"use client";
import {useEffect,useState} from "react";
import{
    PieChart,
    Pie,
    Tooltip,
    Cell,
    ResponsiveContainer,
    Legend
}from "recharts";
const COLORS = [ "#2563eb","#16a34a","#f59e0b","#ef4444","#8b5cf6",];
export default function CategoryChart(){
    const [data,setData] = useState([]);
    useEffect(()=>{
        fetch("/api/transactions/category")
        .then(res=>res.json())
        .then(setData);
    },[]);
      return(
        <div className="mt-10 bg-white p-6 rounded-xl shadow max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Expenses by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie data = {data}
                    dataKey="total"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({name,percent})=>`${name} ${((percent?? 0)*100).toFixed(0)}%`}
                    isAnimationActive>
                        {data.map((_,index)=>(<Cell key={index} fill={COLORS[index%COLORS.length]}/>))}
                    </Pie>
                    <Tooltip formatter={(value)=>`$${value}`} />
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </div>
      )
}
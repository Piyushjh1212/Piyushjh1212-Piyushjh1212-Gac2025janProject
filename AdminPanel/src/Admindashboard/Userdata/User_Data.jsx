import React, { useEffect, useState } from "react";
import "./User_Data.css";
import StatCard from "./Statecard";


export default function User_Data() {
  const [userCount, setUserCount] = useState(0);
  const [userPayment , setUserPayment] = useState(0);
  const [userContactRequest, setuserContectRequest] = useState(0)
  const [userDoubtQuery , setuserDoubtQuery] = useState(0)



  const HandleTotalUser = () => {
    window.location.href = "/admin/Userdata_Display";
  };

  const HandleUserTotalPayment = () =>{
   window.location.href = "/admin/Userpayment_Display";
  }

  useEffect(() =>{
     fetch("/api/payments/total")
     .then((res)=> res.json())
     .then((data)=> setUserCount(data.count))
     .catch((err) => console.error("Error fetching user Count", err));

     fetch("/api/payments/total")
      .then((res) => res.json())
      .then((data) => setUserPayment(data.total))
      .catch((err) => console.error("Error fetching payment total:", err));
     
     fetch("/api/payments/total")
      .then((res) => res.json())
      .then((data) => setuserContectRequest(data.ContactRequest))
      .catch((err) => console.error("Error fetching payment total:", err));

      fetch("/api/payments/total")
      .then((res) => res.json())
      .then((data) =>  setuserDoubtQuery(data.DoubtQuery))
      .catch((err) => console.error("Error fetching payment total:", err));
  },[]);
  return (
    <div className="users_dashboard_container">
      <h1 className="Dashboard_title">Admin Dashboard</h1>
      <div className="stats_container">
        <StatCard title="Total Users" value={userCount} onClick={HandleTotalUser} />
        <StatCard title="Total Payment Collection" value={`₹ ${userPayment}`} onClick={HandleUserTotalPayment} />
        <StatCard title="Contact Form requests" value={userContactRequest} onClick={HandleUserTotalPayment} />
        <StatCard title="Total Doubt Queries" value={userDoubtQuery} onClick={HandleUserTotalPayment} />
        <StatCard title="Total Users" value={userPayment} onClick={HandleUserTotalPayment} />
        <StatCard title="Total Users" value={userPayment} onClick={HandleUserTotalPayment} />
        <StatCard title="Total Users" value={userPayment} onClick={HandleUserTotalPayment} />
        <StatCard title="Total Users" value={userPayment} onClick={HandleUserTotalPayment} />
      </div>
    </div>
  );
}

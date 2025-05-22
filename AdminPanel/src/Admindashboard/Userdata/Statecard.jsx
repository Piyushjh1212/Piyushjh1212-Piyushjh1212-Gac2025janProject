import React from "react";
import "./User_Data.css"; // Use the same CSS or customize it

export default function StatCard({ title, value, onClick }) {
  return (
    <div className="stat-card" onClick={onClick}>
      <h3>{title}</h3>
      <p className="state-card_para">{value}</p>
    </div>
  );
}
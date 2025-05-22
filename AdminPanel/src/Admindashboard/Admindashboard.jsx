// src/Pages/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      <div style={styles.nav}>
        <Link to="/admin/User-data" style={styles.link}> User-Data</Link>
        <Link to="/admin/add-Product-image" style={styles.link}> Add Image</Link>
        <Link to="/admin/add-Vedio" style={styles.link}> Add Vedio</Link>
        <Link to="/admin/manage-settings" style={styles.link}>Our Produts</Link>
        <Link to="/admin/manage-settings" style={styles.link}>settings</Link>
      </div>
    </div>
  );
}

const styles = {
  container: { textAlign: 'center', padding: '50px' },
  nav: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' },
  link: {
    padding: '12px',
    backgroundColor: '#f0f0f0',
    textDecoration: 'none',
    color: '#333',
    fontSize: '18px',
    borderRadius: '6px',
    width: '200px',
    margin: 'auto'
  }
};

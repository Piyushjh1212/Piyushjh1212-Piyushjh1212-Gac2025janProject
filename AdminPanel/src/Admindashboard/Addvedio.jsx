// src/Pages/AddVideo.jsx
import React from 'react';

export default function AddVideo() {
  return (
    <div style={styles.container}>
      <h2>Add Video</h2>
      <form style={styles.form}>
        <input type="text" placeholder="Video Title" style={styles.input} />
        <input type="text" placeholder="Video URL" style={styles.input} />
        <button style={styles.button}>Upload</button>
      </form>
    </div>
  );
}

const styles = {
  container: { padding: '30px', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px', margin: 'auto' },
  input: { padding: '10px', fontSize: '16px' },
  button: { padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' },
};

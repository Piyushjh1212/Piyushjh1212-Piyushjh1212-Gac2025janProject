import { useEffect, useState } from "react";
import "./AdminContactMessages.css";

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/contact/get`);
        const result = await response.json();
        
        if (response.ok) {
          setMessages(result);
        } else {
          setError("Unable to fetch messages.");
        }
      } catch (err) {
        setError("Error connecting to the server.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-contact-container">
      <h2>Contact Messages</h2>
      <ul className="admin-contact-list">
        {messages.map((message) => (
          <li key={message._id} className="admin-contact-item">
            <strong>{message.name}</strong> ({message.email}):
            <p>{message.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminContactMessages;

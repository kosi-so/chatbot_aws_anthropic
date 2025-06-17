import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css'; // Make sure this file contains your typing animation CSS

function App() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = { role: 'user', content: prompt };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setPrompt('');
    setIsTyping(true);

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/chat`, {
        prompt,
      });

      const assistantMessage = {
        role: 'assistant',
        content: res.data.response,
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (err) {
      console.error(err);
      alert('Error contacting Claude API');
    }

    setIsTyping(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: 20,
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ marginBottom: 10 }}>Claude Chatbot</h2>

      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          paddingRight: 10,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: 10,
            }}
          >
            <div
              style={{
                maxWidth: '70%',
                padding: '10px 15px',
                borderRadius: 15,
                backgroundColor: msg.role === 'user' ? '#DCF8C6' : '#F1F0F0',
                color: '#000',
                textAlign: 'left',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              gap: 6,
              paddingLeft: 10,
              marginBottom: 10,
              minHeight: 24,
            }}
          >
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          gap: 10,
          marginTop: 10,
        }}
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 20,
            border: '1px solid #ccc',
            fontSize: 16,
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            borderRadius: 20,
            border: 'none',
            backgroundColor: '#007bff',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default App;

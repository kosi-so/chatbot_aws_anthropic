import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = { role: 'user', content: prompt };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setPrompt('');

    try {
      const res = await axios.post('http://localhost:8000/chat', {
        prompt,
      });

      const assistantMessage = { role: 'assistant', content: res.data.response };
      setMessages([...newMessages, assistantMessage]);
    } catch (err) {
      console.error(err);
      alert('Error calling the Claude API');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Claude Chatbot</h2>
      <div style={{ maxHeight: 300, overflowY: 'auto', border: '1px solid #ccc', padding: 10 }}>
        {messages.map((msg, i) => (
          <p key={i}><strong>{msg.role}:</strong> {msg.content}</p>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask something..."
          style={{ width: '80%', padding: 8 }}
        />
        <button type="submit" style={{ padding: 8, marginLeft: 10 }}>Send</button>
      </form>
    </div>
  );
}

export default App;
// This is a simple React app that allows users to chat with the Claude API.
// It maintains a list of messages and updates the UI with user and assistant responses.
// The app uses Axios to send POST requests to the backend server running on localhost:8000.
// The user can type a message, which is sent to the backend when the form is submitted.
// The backend is expected to handle the request and return a response from the Claude API.

import { useState } from "react";
import { Link } from "react-router";
import { sendChat } from "../../services/aiService";

function AIAssistant() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!text) return;

    const newMessages = [...messages, { role: "user", text: text }];
    setMessages(newMessages);
    setText("");
    setLoading(true);
    setError("");

    try {
      const response = await sendChat(newMessages);
      setMessages([...newMessages, { role: "model", text: response.reply }]);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div>
      <h1>AI Assistant</h1>
      <p>Describe your IT problem and I will suggest steps to fix it.</p>

      {messages.map((oneMessage, index) => (
        <div key={index}>
          <strong>{oneMessage.role === "user" ? "You" : "Assistant"}:</strong>
          <p style={{ whiteSpace: "pre-wrap" }}>{oneMessage.text}</p>
        </div>
      ))}

      {loading ? <p>Thinking...</p> : null}
      {error ? <p className="error">{error}</p> : null}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Type your problem..."
        />
        <button type="submit" disabled={loading}>
          Send
        </button>
      </form>

      <p>
        Still not fixed? <Link to="/tickets/new">Create a ticket</Link>
      </p>
    </div>
  );
}

export default AIAssistant;

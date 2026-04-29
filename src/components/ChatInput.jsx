import { useState } from "react";

const ChatInput = ({ onSend, loading }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "10px",
      }}
    >
      <input
        type="text"
        placeholder="Ask banking question..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          flex: 1,
          padding: "10px",
        }}
      />

      <button
        onClick={handleSend}
        disabled={loading}
        style={{
          padding: "10px 20px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
};

export default ChatInput;
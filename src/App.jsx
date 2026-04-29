import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import { sendMessageToLLM } from "./services/api";

function App() {
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: "Hello! I am your Banking Support Assistant.",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleSend = async (userText) => {
    const userMessage = {
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    const aiResponse = await sendMessageToLLM(userText);

    const assistantMessage = {
      sender: "assistant",
      text: aiResponse,
    };

    setMessages((prev) => [...prev, assistantMessage]);

    setLoading(false);
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        fontFamily: "Arial",
      }}
    >
      <h2>AI Banking Support Assistant</h2>

      <ChatWindow messages={messages} />

      <ChatInput
        onSend={handleSend}
        loading={loading}
      />
    </div>
  );
}

export default App;
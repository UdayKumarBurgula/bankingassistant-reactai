import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({ messages }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div
      style={{
        height: "400px",
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "15px",
        borderRadius: "10px",
        background: "#fafafa",
      }}
    >
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}

      <div ref={bottomRef}></div>
    </div>
  );
};

export default ChatWindow;
const MessageBubble = ({ message }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          message.sender === "user" ? "flex-end" : "flex-start",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          background:
            message.sender === "user" ? "#007bff" : "#f1f1f1",
          color: message.sender === "user" ? "white" : "black",
          padding: "12px",
          borderRadius: "10px",
          maxWidth: "70%",
        }}
      >
        <strong>
          {message.sender === "user" ? "User" : "AI"}
        </strong>
        <div>{message.text}</div>
      </div>
    </div>
  );
};

export default MessageBubble;
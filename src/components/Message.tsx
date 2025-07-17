import React from "react";
import "./Message.css";

interface MessageProps {
  text: string;
  fromUser?: boolean;
}

const Message: React.FC<MessageProps> = ({ text, fromUser }) => (
  <div className={`message-row ${fromUser ? "user" : "bot"}`}>
    <div className={`message-bubble ${fromUser ? "user" : "bot"}`}>
      {text}
    </div>
  </div>
);

export default Message;
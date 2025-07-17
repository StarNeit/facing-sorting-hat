import React, { useEffect, useRef } from "react";
import Message from "./Message";
import "./Chat.css";

interface ChatProps {
  messages: { text: string; fromUser?: boolean }[];
}

const Chat: React.FC<ChatProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.map((msg, idx) => (
        <Message key={idx} text={msg.text} fromUser={msg.fromUser} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default Chat;
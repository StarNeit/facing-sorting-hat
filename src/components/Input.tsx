import React, { useState } from "react";
import "./Input.css";

interface InputProps {
  onSend: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ onSend, disabled, placeholder }) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (value.trim()) {
      onSend(value.trim());
      setValue("");
    }
  };

  return (
    <div className="input-row">
      <input
        className="input-box"
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSend()}
        disabled={disabled}
        placeholder={placeholder || "Type your answer..."}
      />
      <button
        className="input-send"
        onClick={handleSend}
        disabled={disabled}
      >
        Send
      </button>
    </div>
  );
};

export default Input;
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleMsg }) {
  const [message, setMessage] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  const togglePicker = (e) => {
    e.stopPropagation(); // Prevent event bubbling that triggers global handlers
    setShowPicker((val) => !val);
  };

  const onEmojiClick = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
    // Do NOT close picker here, allow multiple clicks
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      handleMsg(message);
      setMessage("");
      setShowPicker(false); // Close picker on send
    }
  };

  // Close emoji picker if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };
    if (showPicker) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <Container>
      <div className="button-container" onClick={togglePicker}>
        <BsEmojiSmileFill size={28} />
        {showPicker && (
          <div ref={pickerRef} className="emoji-picker-wrap" onClick={e => e.stopPropagation()}>
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>
      <form className="input-container" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoComplete="off"
        />
        <button className="submit" type="submit">
          <IoMdSend size={19} />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem 1rem;
  background: #272247;
  border-radius: 2rem;

  .button-container {
    position: relative;
    cursor: pointer;
    color: #ffe900;
    display: flex;
    align-items: center;

    .emoji-picker-wrap {
      position: absolute;
      bottom: 50px;
      left: 0;
      z-index: 1000;
      background-color: #080420;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
      border-radius: 1rem;
    }
  }
.input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }

    button.submit {
      background-color: #4e0eff;
      border: none;
      
      border-radius: 50%;
      width: 42px;
      height: 42px;
      color: white;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color 0.3s ease;

      &:hover {
      
        background-color: #6a32ff;
      }
    }
  }
`;

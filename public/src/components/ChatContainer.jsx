import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { recieveMessageRoute, sendMessageRoute } from "../utils/APIRoutes";
import ChatInput from "./ChatInput";
import Logout from "./LogOut";
import { v4 as uuid4 } from "uuid";

export default function ChatContainer({ currentChat, currentUser , socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    async function getMsg() {
      if (currentChat) {
        const response = await axios.post(recieveMessageRoute, {
          from: currentUser?._id,
          to: currentChat?._id,
        });
        setMessages(response.data);
      }
    }
    getMsg();
  }, [currentUser, currentChat]);

  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser?._id,
      to: currentChat?._id,
      message: msg,
      time: new Date().toISOString(), // Always send a time!
    });
    socket.current.emit("send-msg", {
      to: currentChat?._id,
      from: currentUser?._id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg, time: new Date().toISOString() });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg, time: new Date().toISOString() });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ---- DEFINE THESE FUNCTIONS INSIDE COMPONENT ----
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    if (isNaN(date)) return "Invalid Date";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    if (isNaN(date)) return "";
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ---- DECLARE LASTDATE RIGHT BEFORE MAP ----
  let lastDate = null;

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={currentChat.avatarImage} alt="avatar" />
          </div>
          <div className="username">
            <h3>{currentChat?.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map(({ id, fromSelf, message, time }, index) => {
          const dateString = formatDate(time);
          const showDate =
            !lastDate || dateString !== lastDate
              ? ((lastDate = dateString),
                <div key={`date-${id || index}`} className="date-separator">
                  {dateString}
                </div>)
              : null;
          return (
            <React.Fragment key={id || index}>
              {showDate}
              <div ref={index === messages.length - 1 ? scrollRef : null} className={`message ${fromSelf ? "sender" : "received"}`}>
                <div className="content">
                  <p>{typeof message === "object" ? message.text : message}</p>
                  <span className="msg-time">{formatTime(time)}</span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <ChatInput handleMsg={handleSendMsg} />
    </Container>
  );
}

// ...Styled Components CSS here...

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    background-color: #1f1f38;
    box-shadow: 0 8px 4px #0a0a0b50;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        position: relative;
        padding-bottom: 1.5rem; /* room for time */
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sender {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
  .msg-time {
    position: absolute;
    bottom: 0.4rem;
    right: 1rem;
    font-size: 0.82rem;
    color: #aaa;
    opacity: 0.7;
    user-select: none;
  }
  .date-separator {
    color: #bbb;
    text-align: center;
    font-size: 0.96rem;
    margin: 0.7rem 0;
    opacity: 0.9;
  }
`;

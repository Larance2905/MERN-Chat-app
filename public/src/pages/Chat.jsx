import React, { useEffect, useState ,useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {io} from "socket.io-client";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { allUsersRoute ,host} from "../utils/APIRoutes";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("Chat-app-user");
    if (!userData) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(userData));
      setIsLoaded(true);
    }
  }, [navigate]);

  useEffect(() => { 
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user",currentUser._id);
    }

  },[currentUser]);


  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        axios
          .get(`${allUsersRoute}/${currentUser._id}`)
          .then((res) => setContacts(res.data.users))
          .catch((err) => console.error("Failed to fetch contacts:", err));
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      {currentUser && isLoaded && (
        <div className="chat-container">
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {!currentChat ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket ={socket} />
          )}
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(120deg, #23234a 60%, #131324 100%);
  display: flex;
  justify-content: center;
  align-items: center;

  .chat-container {
    height: 85vh;
    width: 85vw;
    display: grid;
    grid-template-columns: 30% 70%;
    background-color: #1f1f38;
    border-radius: 1.5rem;
    overflow: hidden;

    @media (max-width: 720px) {
      grid-template-columns: 1fr;
      height: 100vh;
      width: 100vw;
      border-radius: 0;
    }
  }
`;

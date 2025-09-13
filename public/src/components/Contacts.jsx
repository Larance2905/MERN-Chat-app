import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts = [], currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [currentSelected, setCurrentSelected] = useState(null);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  // When user clicks a contact card
  const handleContactClick = (index, contact) => {
    setCurrentSelected(index);
    if (changeChat) changeChat(contact);
  };

  // Defensive rendering if data not loaded
  if (!currentUserImage || !currentUserName) {
    return <div>Contacts</div>;
  }

  return (
    <Container>
      <div className="brand">
        <img src={Logo} alt="logo" />
        <h3>CHAT</h3>
      </div>
      <div className="contacts">
        {contacts.map((contact, index) => (
          <div
            key={contact._id}
            className={`contact ${index === currentSelected ? "selected" : ""}`}
            onClick={() => handleContactClick(index, contact)}
          >
            <div className="avatar">
              <img src={contact.avatarImage} alt="avatar" />
            </div>
            <div className="username">
              <h3>{contact.username}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="current-user">
        <div className="avatar">
          <img src={currentUserImage} alt="avatar" />
        </div>
        <div className="username">
          <h2>{currentUserName}</h2>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid
  ;
  grid-template-rows: 10% 75% 15%;
  width: 330px;
  min-width: 260px;
  background: #1e1940;
  border-radius: 1.5rem;
  box-shadow: 0 4px 24px #130f2a50;
  margin: 0 auto;
  overflow: hidden;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem 0 1rem 0;
    img {
      height: 2rem;
    }
    h3 {
      color: #fff;
      font-weight: bold;
      font-size: 1.3rem;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    gap: 0.8rem;
    padding: 0.8rem 0.5rem 0 0.5rem;

    &::-webkit-scrollbar {
      width: 0.25rem;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #40328e60;
      border-radius: 1rem;
    }

    .contact {
      display: flex;
      align-items: center;
      gap: 1rem;
      background: #272247;
      min-height: 5rem;
      width: 95%;
      border-radius: 1rem;
      padding: 0.8rem 0.6rem;
      box-shadow: 0 2px 12px #170c3722;
      cursor: pointer;
      transition: background 0.2s, transform 0.18s;
      &:hover {
        background: #2b264a;
        transform: scale(1.02);
      }
      .avatar {
        width: 3.7rem;
        height: 3.7rem;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid #ffe90099;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        box-shadow: 0 0 7px #fdce5f80;
      }
      .username h3 {
        color: #fafafa;
        font-size: 1.3rem;
        font-weight: 600;
        margin-left: 0.3rem;
        letter-spacing: 1px;
      }
    }
    .selected {
      background: linear-gradient(90deg,#ffed57 0%, #735ad3 120%);
      box-shadow: 0 2px 20px #fce56030;
      .username h3 {
        color: #141314ff;
        font-weight: bold;
      }
    }
  }
  .current-user {
    background: #050505ff;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.4rem;
    padding: 1rem;
    .avatar img {
      height: 2.6rem;
      width: 2.6rem;
      border-radius: 50%;
      border: 2.5px solid #735ad3;
      background: #fff;
      object-fit: cover;
    }
    .username h2 {
      color: #ffe900;
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: 1px;
      text-shadow: 0 1px 5px #735ad399;
    }
  }
`;

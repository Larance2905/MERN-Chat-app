import React from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif';

function Welcome({ currentUser }) {
  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{currentUser?.username}!</span>
      </h1>
      <h3>Select a contact to start chatting.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  color: #eee;
  text-align: center;

  img {
    height: 250px;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;

    span {
      color: #ffe900;
      font-weight: 700;
    }
  }

  h3 {
    font-weight: 500;
    color: #bbb;
    font-size: 1.3rem;
  }
`;

export default Welcome;

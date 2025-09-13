import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiPowerOff } from 'react-icons/bi';

export default function LogOut() {
  const navigate = useNavigate();

  const handleClick = async () => {
    localStorage.removeItem("Chat-app-user");
      navigate('/login');
    } 

  return (
    <Button onClick={handleClick} title="Log Out">
      <BiPowerOff size={28} color="#fff" />
    </Button>
  );
}

const Button = styled.button`
  background: #4e0eff;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  &:hover {
    background: #e51717ff;
  }
`;

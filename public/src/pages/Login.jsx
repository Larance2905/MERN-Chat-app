import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });

  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      toast.error("Email and Password are required", toastOptions);
      return;
    }

    try {
      const { data } = await axios.post(loginRoute, values);
      console.log("Login response:", data); // debug
      if (!data.status) {
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem("Chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    } catch (error) {
      toast.error("Login failed. Try again.", toastOptions);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <div className="brand">
          <h1>Chat App</h1>
        </div>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
        <span>Don't have an account? <Link to="/register">Register</Link></span>
      </form>
      <ToastContainer /> {/* ✅ toast container added */}
    </FormContainer>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #131324;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  form {
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 350px;
    box-shadow: 0 0 40px rgba(243, 239, 239, 1);
  }

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    img {
      height: 3.5rem;
    }

    h1 {
      color: white;
      font-size: 1.8rem;
      text-transform: uppercase;
    }
  }

  input {
    background-color: transparent;
    padding: 0.9rem;
    border: 1px solid #c3f292ff;
    border-radius: 0.4rem;
    color: #b3acacff;
    font-size: 1rem;

    &::placeholder {
      color: #777;
    }

    &:focus {
      border: 1px solid #edf3f1ff;
      outline: none;
    }
  }

  button {
    background-color: #58da41ff;
    color: black;
    padding: 1rem;
    border: none;
    border-radius: 2rem;
    font-weight: bold;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: #00cc66;
      transform: scale(1.02);
    }
  }

  span {
    color: white;
    text-align: center;
    font-size: 0.9rem;

    a {
      color: #00ccff;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media screen and (max-width: 480px) {
    form {
      padding: 2rem;
      max-width: 90%;
    }
  }
`;

export default Login;

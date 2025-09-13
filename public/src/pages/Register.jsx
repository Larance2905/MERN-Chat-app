import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg'; // Ensure correct path
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (localStorage.getItem("Chat-app-user")) {
      navigate("/register");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;

    if (!username || !email || !password || !confirmPassword) {
      toast.error("All fields are required", toastOptions);
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should be same.", toastOptions);
      return false;
    }

    if (username.length < 3) {
      toast.error("Username should be at least 3 characters long.", toastOptions);
      return false;
    }

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;

      try {
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });

        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }

        if (data.status === true) {
          localStorage.setItem("Chat-app-user", JSON.stringify(data.user));
          navigate("/");
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.", toastOptions);
        console.error("Registration Error:", error);
      }
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>Chat App</h1>
          </div>
          <input
            id="username"
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
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

export default Register;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const toastOptions = {
    position: "top-center",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const loadAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const random = Math.round(Math.random() * 1000);
        const imageUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${random}`;
        data.push(imageUrl);
      }
      setAvatars(data);
      setIsLoading(false);
    };

    loadAvatars();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }

    const userData = localStorage.getItem("Chat-app-user");
    if (!userData) {
      toast.error("User not found. Please log in again.", toastOptions);
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);

    try {
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("Chat-app-user", JSON.stringify(user));
        navigate("/login");
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    } catch (err) {
      console.error("Set avatar failed:", err);
      toast.error("Server error. Please try again.", toastOptions);
    }
  };

  return (
    <>
      {isLoading ? (
        <Container>
          <h2>Loading avatars...</h2>
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img src={avatar} alt="avatar" />
              </div>
            ))}
          </div>
          <button onClick={setProfilePicture}>Set as Profile Picture</button>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  justify-content: center;

  .title-container h1 {
    color: white;
  }

  .avatars {
    display: flex;
    gap: 1.5rem;
    color: white;

    .avatar {
      border: 0.4rem solid transparent;
      border-radius: 50%;
      padding: 0.4rem;
      transition: 0.3s ease-in-out;

      img {
        height: 6rem;
        border-radius: 50%;
      }

      &.selected {
        border-color: #4e0eff;
      }

      &:hover {
        background-color: #e7dedeff;
        cursor: pointer;
      }
    }
  }

  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    border-radius: 0.4rem;
    cursor: pointer;
    transition: 0.3s ease-in-out;

    &:hover {
      background-color: #e51717ff;
    }
  }
`;

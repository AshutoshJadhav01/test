import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import App from "../App";
import Notes from "./Notes";
import uuid from "uuid";
import { useEffect } from "react";
import { Dialog } from "@headlessui/react";
function AuthPage() {
  // added { onLogin } which is used by app.js
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [messageLogin, setMessageLogin] = useState("");

  const [isLoggedIn, setisLoggedIn] = useState(false);

  const handleRegister = async () => {
    try {
      if (username || password) {
        const response = await axios.post("http://localhost:5000/register", {
          username,
          password,
        });
        if (response.status === 200) {
          alert(`Username : ${username} Registered Sucessfully`);
        } else if (response.status === 204) {
          alert(`Username: ${username} Already Taken`);
        }
      } else {
        alert("Username and password are required");
      }
    } catch (error) {
      console.log("register failed");
      console.log(error);
      alert("An error occurred");
    }
  };

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setisLoggedIn(false);
        alert("Username and password are required");
        return;
      } else {
        const response = await axios.post("http://localhost:5000/login", {
          username,
          password,
        });

        //const token = response.data.token;
        // Use the token as needed (e.g., store it in localStorage)
        //if (response.status == 200) {
        //   setMessageLogin(` ${username} Logged in sucessfully`);
        //}

        if (response.status === 200) {
          setisLoggedIn(true);
          alert(`Username: ${username} logged in Sucessfully`);
        } else if (response.status === 401) {
          setisLoggedIn(false);
          alert(` Incorrent Password`);
        }
      }
    } catch (error) {
      alert("Invalid credentials/ User not registered");
    }
    // onLogin(username);//added for multipage
    // alert(messageLogin);
  };
  useEffect(() => {
    // Fetch user's notes using the stored token and populate the notes state
    // navigateToNotes();
    // You can make an authenticated API call to retrieve user notes here
  }, []);
  return (
    <div className="registration">
      <Header></Header>

      {isLoggedIn ? (
        <Notes username={username} isLoggedIn={isLoggedIn}>
          setisLoggedIn={setisLoggedIn}
        </Notes>
      ) : (
        <div>
          <Dialog open={isLoggedIn} onClose={() => setisLoggedIn(true)}>
            <Dialog.Panel>
              <Dialog.Title>Deactivate account</Dialog.Title>
              <Dialog.Description>Logged in Sucess</Dialog.Description>

              <p>
                Are you sure you want to deactivate your account? All of your
                data will be permanently removed. This action cannot be undone.
              </p>
            </Dialog.Panel>
          </Dialog>
          <h4 className="notes__title">Sign up for space rep</h4>
          <p>Enter user Name and password</p>
          <input
            type="text"
            placeholder="Username"
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <br></br>
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>
            Login
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h4.59l-2.1 1.95a.75.75 0 001.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 10-1.02 1.1l2.1 1.95H6.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default AuthPage;
// //aded for login and post login page
//send isLoggedIn to app
//(<App data isLoggedIn={isLoggedIn}></App>)

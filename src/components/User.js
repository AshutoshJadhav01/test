//OLD VERSION OF AUTHPAGE
import React, { useState } from "react";
import axios from "axios";
function User() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageLogin, setMessageLogin] = useState("");
  const [messageRegister, setMessageRegister] = useState("");
  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      setMessageRegister(response.data.message);
    } catch (error) {
      console.log("register failed");
      console.log(error);
      setMessageRegister("An error occurred");
    }
    alert(messageRegister);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      //const token = response.data.token;
      // Use the token as needed (e.g., store it in localStorage)
      //if (response.status == 200) {
      //   setMessageLogin(` ${username} Logged in sucessfully`);
      //}
      setMessageLogin(response.data.message);
      console.log(messageLogin);
      alert(messageLogin);
    } catch (error) {
      alert("Invalid credentials/ User not registered");
    }
    // alert(messageLogin);
  };

  return (
    <div className="registration">
      <h1 className="notes__title">Sign up for space rep</h1>
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
      <button onClick={handleRegister}>Register</button>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default User;

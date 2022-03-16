import React from "react";
import { useState } from "react";
import bcrypt from "bcryptjs";
import "./LogAndSignup.css";

const salt = "$2b$10$A7/SX9iqJkE7jUs0vi38Gu";

export default function Login({ setToken, setIsUser, setUserid }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const hashedPassword = bcrypt.hashSync(password, salt);
    fetch("https://auth-test-zz.uc.r.appspot.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: hashedPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.id);
        setUserid(data.id);
        localStorage.setItem("id", data.id);
        setToken(data.token);
        localStorage.setItem("token", data.token);
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="header">BIKE'S UP</h1>
        <h2 className="subheader">login</h2>

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />

        <button className="btn" type="submit">
          Login
        </button>
        <div style={{ fontFamily: "Raleway", fontSize: "2vh" }}>
          Not a user?
        </div>
        <button className="btnLogin" onClick={() => setIsUser(false)}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

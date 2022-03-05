import { useState } from "react";
import bcrypt from "bcryptjs";

const salt = "$2b$10$A7/SX9iqJkE7jUs0vi38Gu";

export default function Signup({ setToken, setIsUser, setUserid }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const hashedPassword = bcrypt.hashSync(password, salt);
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password: hashedPassword }),
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
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Username:
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <input type="submit" value="Sign up" />
      </form>
      <br />
      <button onClick={() => setIsUser(true)}>Login</button>
    </>
  );
}

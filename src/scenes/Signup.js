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
    
    fetch("https://auth-test-zz.uc.r.appspot.com/users", {
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

  //styling
  const container = {
    position: "absolute",
    top: "5vh",
    backgroundColor: "hsl(200deg 100% 50%)",
    height: "400px",
    width: "250px",
    borderRadius: "5%",
    boxShadow: "0 0 5px 0 hsl(0deg 0% 30%)",
    border: "2px solid hsl(200deg 100% 85%)",
  };
  const form = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "hsl(200deg 100% 80%)",
  };
  const header = {
    textAlign: "center",
    color: "aliceblue",
    fontStyle: "oblique",
    fontWeight: "bolder",
    fontFamily: "cursive",
    margin: "1em",
    fontSize: "xx-large",
  };
  const subheader = {
    margin: "0",
    fontSize: "0.8em",
    fontStyle: "italic",
  };
  const body = {
    color: "hsl(200deg 100% 80%)",
  };
  const label = {
    fontStyle: "italic",
    fontFamily: "serif",
    fontWeight: "bolder",
  };
  const input = {
    outline: "none",
    border: "1px solid hsl(200deg 100% 90%)",
    borderRadius: "0.3em",
    color: "hsl(200deg 100% 51%)",
  };
  const button = {
    padding: "0.2em 1.5em",
    borderRadius: "0.5em",
    border: "1px solid hsl(200deg 100% 80%)",
    backgroundColor: "hsl(200deg 100% 70%)",
    color: "white",
    fontWeight: "bolder",
    fontFamily: "cursive",
  };
  const btnLogin = {
    padding: "0.2em 2em",
    borderRadius: "0.5em",
    border: "1px solid hsl(200deg 100% 80%)",
    backgroundColor: "hsl(200deg 100% 70%)",
    color: "white",
    fontWeight: "bolder",
    fontFamily: "cursive",
  };

  return (
    <div style={container}>
      <form onSubmit={handleSubmit} style={form}>
        <h1 style={header}>WE BIKE</h1>
        <h2 style={subheader}>Signup</h2>
        <div style={body}>
          <label style={label}>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />
          <br />
          <label style={label}>Username:</label>
          <br />
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={input}
          />
          <br />
          <label style={label}>Password:</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />
        </div>
        <br />
        <button style={btnLogin} type="submit">
          Sign up{" "}
        </button>
        <br />
        <div style={{ fontStyle: "italic", fontSize: "0.6em" }}>
          Already a user?
        </div>
        <button style={button} onClick={() => setIsUser(true)}>
          Login
        </button>
      </form>
    </div>
  );
}

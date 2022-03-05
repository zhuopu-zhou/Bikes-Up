import { useState, useEffect } from "react";
import Signup from "./scenes/Signup";
import Login from "./scenes/Login";
import UserList from "./scenes/UserList";
import Chat from "./scenes/Chat";

export default function App() {
  const [token, setToken] = useState();
  const [isUser, setIsUser] = useState();
  const [userid, setUserid] = useState();
  const [chat, setChat] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
    const myToken = localStorage.getItem("token");
    const myChat = localStorage.getItem("chat");
    const myId = localStorage.getItem("id");
    const myEmail = localStorage.getItem("email");
    const myPassword = localStorage.getItem("password");
    setToken(myToken);
    setChat(myChat);
    setUserid(myId);
    setEmail(myEmail);
    setPassword(myPassword);
  }, []);
  return (
    //apply css to section
    <section>
      {!token ? (
        isUser ? (
          <Login
            setToken={setToken}
            setIsUser={setIsUser}
            setUserid={setUserid}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        ) : (
          <Signup
            setToken={setToken}
            setIsUser={setIsUser}
            setUserid={setUserid}
            setEmail={setEmail}
            setPassword={setPassword}
          />
        )
      ) : !chat ? (
        <UserList
          token={token}
          setToken={setToken}
          userid={userid}
          setChat={setChat}
        />
      ) : (
        <Chat setChat={setChat} email={email} password={password} />
      )}
    </section>
  );
}

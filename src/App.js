import { useState, useEffect } from "react";
import Signup from "./scenes/Signup";
import Login from "./scenes/Login";
import UserList from "./scenes/UserList";
import Chat from "./scenes/Chat";

export default function App() {
  const [token, setToken] = useState();
  const [isUser, setIsUser] = useState();
  const [userid, setUserid] = useState();
  const [chatFriendId, setChatFriendId] = useState();
  const [chat, setChat] = useState();

  useEffect(() => {
    const myToken = localStorage.getItem("token");
    const myId = localStorage.getItem("id");
    const myFriendId = localStorage.getItem("friendId");
    const myChat = localStorage.getItem("chat");

    setToken(myToken);
    setUserid(myId);
    setChatFriendId(myFriendId);
    setChat(myChat);
  }, []);
  return (
    //apply css to section
    <section
      style={{
        backgroundColor: "#1c284e",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {!token ? (
        isUser ? (
          <Login
            setToken={setToken}
            setIsUser={setIsUser}
            setUserid={setUserid}
          />
        ) : (
          <Signup
            setToken={setToken}
            setIsUser={setIsUser}
            setUserid={setUserid}
          />
        )
      ) : (chat&&chatFriendId) ? (
        <Chat
          token={token}
          setChat={setChat}
          userid={userid}
          chatFriendId={chatFriendId}
          setChatFriendId={setChatFriendId}
        />
      ) : (
        <UserList
          token={token}
          setToken={setToken}
          userid={userid}
          setUserid={setUserid}
          setChat={setChat}
          chatFriendId={chatFriendId}
          setChatFriendId={setChatFriendId}
        />
      )}
    </section>
  );
}

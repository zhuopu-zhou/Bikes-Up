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
    const myChat = localStorage.getItem("chat");
    const myId = localStorage.getItem("id");
    const myFriendId = localStorage.getItem("friendId");

    setToken(myToken);
    setChat(myChat);
    setUserid(myId);
    setChatFriendId(myFriendId);
  }, []);
  return (
    //apply css to section
    <section style={{ backgroundColor: "azure", height: "100vh" }}>
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
      ) : !chat ? (
        <UserList
          token={token}
          setToken={setToken}
          userid={userid}
          setChat={setChat}
          setChatFriendId={setChatFriendId}
        />
      ) : (
        <Chat
          token={token}
          setChat={setChat}
          userid={userid}
          chatFriendId={chatFriendId}
          setChatFriendId={setChatFriendId}
        />
      )}
    </section>
  );
}

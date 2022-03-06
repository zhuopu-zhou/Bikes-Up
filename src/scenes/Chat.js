import { useState, useEffect } from "react";

export default function Chat({
  setChat,
  userid,
  chatFriendId,
  setChatFriendId,
  token,
}) {
  const [messages, setMessages] = useState();
  useEffect(() => {
    fetch("http://localhost:3001/messages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.messages);
       
        setMessages(data.messages);
       
      })
      .catch(alert);
  }, [token, userid]);

  const goToList = () => {
    setChat(false);
    localStorage.setItem("chat", false);
    setChatFriendId("");
    localStorage.setItem("friendId", "");
  };

  return (
    <>
      <h1>Chat room</h1>
      <section>messages</section>

      {!messages ? (
        <h2>Loading...</h2>
      ) : (
        messages.map((message) => {
          return (
            <p key={message.id}>
              {message.text}||||{message.id}||||
            </p>
          );
        })
      )}

      <button onClick={goToList}>go to user list</button>
    </>
  );
}

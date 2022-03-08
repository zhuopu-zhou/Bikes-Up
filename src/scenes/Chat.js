import { useState, useEffect } from "react";

export default function Chat({
  setChat,
  userid,
  chatFriendId,
  setChatFriendId,
  token,
}) {
  const [newMessage, setNewmessage] = useState();
  const [messages, setMessages] = useState();
  // useEffect(() => {

  //   fetch("http://localhost:3001/messages", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.messages);
  //       setMessages(data.messages);
  //     })
  //     .catch(alert);
  // }, [token]);

  const dummyMessages = [
    { id: "1", username: "matt", text: "hi" },
    { id: "2", username: "mary", text: "good how are you" },
    { id: "3", username: "mary", text: "had lunch? let's go get some after noon tea and cakes" },
    { id: "4", username: "matt", text: "no" },
    { id: "5", username: "matt", text: "lets go!" },
  ];

  const goToList = () => {
    setChat(false);
    localStorage.setItem("chat", false);
    setChatFriendId("");
    localStorage.setItem("friendId", "");
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
  const title = {
    textAlign: "center",
    color: "white",
    fontStyle: "italic",
    fontFamily: "cursive",
    fontSize: "x-large",
    margin: "0px",
    marginTop: "10px",
  };
  const [userBg, setUserBg] = useState("hsl(201deg 100% 85%)");
  const userOut = {
    borderRadius: "1em",
    border: "1px solid white",
    color: "white",
    backgroundColor: userBg,
  };
  const list = {
    overflow: "scroll",
    height: "260px",
    backgroundColor: "hsl(201deg 100% 95%)",
  };

  const friendChatBox = {
    border: "2px solid hsl(201deg 100% 85%)",
    borderRadius: "0.3em",
    margin: "0px",
    marginBottom: "3px",
    backgroundColor: "hsl(201deg 100% 95%)",
    width: "200px",
  };

  const myChatBox = {
    border: "2px solid hsl(201deg 100% 65%)",
    borderRadius: "0.3em",
    margin: "0px",
    marginBottom: "3px",
    backgroundColor: "hsl(201deg 100% 75%)",
    width: "200px",
    position: "relative",
    left: "46px",
  };

  const msgInput = {
    outline: "none",
    border: "0.01em solid hsl(200deg 100% 56%)",
    width: "180px",
    backgroundColor: "hsl(201deg 100% 95%)",
    borderRadius: "0.7em",
    fontFamily: "sans-serif",
  };
  const [msgBg, setMsgBg] = useState("hsl(201deg 100% 85%)");
  const sendMsg = {
    borderRadius: "1em",
    border: "1px solid white",
    color: "white",
    backgroundColor: msgBg,
    marginLeft: "1em",
  };

  return (
    <section style={container}>
      <h1 style={title}>Chat && Cycle </h1>
      <div style={{ width: "250px", backgroundColor: "hsl(201deg 100% 85%)" }}>
        <button
          style={userOut}
          onClick={goToList}
          onMouseEnter={() => setUserBg("hsl(201deg 100% 55%)")}
          onMouseLeave={() => setUserBg("hsl(201deg 100% 85%)")}
        >
          User
        </button>
      </div>
      <br />
      <section style={list}>
        {!dummyMessages ? (
          <h2>Loading...</h2>
        ) : (
          dummyMessages.map((message) => {
            if (message.username === "matt") {
              return (
                <p style={myChatBox} key={message.id}>
                  {message.text}||||{message.id}||||
                </p>
              );
            }
            return (
              <p style={friendChatBox} key={message.id}>
                {message.text}||||{message.id}||||
              </p>
            );
          })
        )}
      </section>

      <div
        style={{
          width: "250px",
          height: "2em",
          backgroundColor: "hsl(201deg 100% 85%)",
          marginTop: "0.5em",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={() => console.log(newMessage)}>
          <input
            value={newMessage}
            onChange={(e) => setNewmessage(e.target.value)}
            style={msgInput}
          />
          <button
            type="submit"
            disabled={!newMessage}
            style={sendMsg}
            onMouseEnter={() => setMsgBg("hsl(201deg 100% 55%)")}
            onMouseLeave={() => setMsgBg("hsl(201deg 100% 85%)")}
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

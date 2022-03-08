import { useState, useEffect } from "react";
import React from "react";
import { db } from "./firebase-config";
import { collection, getDocs,addDoc, where, query, onSnapshot } from "@firebase/firestore";

export default function Chat({
  setChat,
  userid,
  chatFriendId,
  setChatFriendId,
  token,
}) {
  const [messages, setMessages] = useState([]);
  const msgsCollectionRef = collection(db, "messages");
  //const q = query(msgsCollectionRef,   where('uids', 'in', ['1','2']));
  const q = query(msgsCollectionRef,   where('uids', 'array-contains-any', [userid, chatFriendId]));
  //order q by timeStamp
  
  useEffect(() => {
    const getMessages = async () => {
      await onSnapshot(q, (snapshot) => {
      console.log(snapshot.docs);
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    
    getMessages().then();
  }, []);

  console.log(messages);
  
  const [newMessage, setNewmessage] = useState();
  //send new message with both user id and timeStamp
  const sendNewMsg = async(e)=>{
    e.preventDefault();
    await addDoc(msgsCollectionRef,{text:newMessage,uids: [userid, chatFriendId], 
      uid1:userid,uid2:chatFriendId,
      timeStamp:0})
  }

  const dummyMessages = [
    { id: "1", username: "matt", text: "hi" },
    { id: "2", username: "mary", text: "good how are you" },
    {
      id: "3",
      username: "mary",
      text: "had lunch? let's go get some after noon tea and cakes",
    },
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
        {!messages ? (
          <h2>Loading...</h2>
        ) : (
          messages.map((message) => {
            return (
              <p style={myChatBox} key={message.id}>
                {message.text}
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
        <form onSubmit={(e) => sendNewMsg(e)}>
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

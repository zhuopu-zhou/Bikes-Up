import { useState, useEffect, useRef } from "react";
import React from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  where,
  query,
  onSnapshot,
  serverTimestamp,
  orderBy,
} from "@firebase/firestore";

export default function Chat({
  setChat,
  userid,
  chatFriendId,
  setChatFriendId,
  token,
}) {
  const dummy = useRef();
  const [messages, setMessages] = useState([]);
  const msgsCollectionRef = collection(db, "messages");

  const getMsg = async (Ref) => {
    let uid = [chatFriendId, userid];
    uid = uid.sort();
    const q1 = query(
      Ref,
      //where("uids", "==", [chatFriendId,userid]),
      where("uids", "==", [...uid]),
      orderBy("timeStamp")
    );

    onSnapshot(q1, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    // const data = await getDocs(q1);
    // setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getMsg(msgsCollectionRef);
  }, []);

  // const q1 = query(
  //   msgsCollectionRef,
  //   where("uids", "==", [ userid,chatFriendId]),
  // );

  //   //bugs here
  // useEffect(() => {
  //   listenForMessages(q1);
  // }, []);

  // const listenForMessages = (query) => {
  //   onSnapshot(query, (snapshot) => {
  //     setNewMessages(
  //       snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //     );
  //   });
  // };

  // const setNewMessages = (newMessages) => {
  //   //console.log(newMessages);
  //   // filter if they already exist by id;
  //   // then you sort them;
  //   // newMessages filter out any messages that have the same
  //   const filtered = newMessages.filter((text) => text.id.includes(text.id));
  //   setMessages(
  //     [...messages, ...filtered].sort((a, b) =>
  //       a.timeStamp.seconds > b.timeStamp.seconds ? 1 : -1
  //     )
  //   );
  // };

  const [newMessage, setNewmessage] = useState();
  //send new message with both user id and timeStamp
  const sendNewMsg = async (e) => {
    e.preventDefault();
    let uid = [chatFriendId, userid];
    uid = uid.sort();
    console.log(uid);

    await addDoc(msgsCollectionRef, {
      text: newMessage,
      uids: uid,
      uid1: [userid],
      uid2: [chatFriendId],
      timeStamp: serverTimestamp(),
    });
    setNewmessage("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

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

  const dummyMsg = [
    { id: 1, uid1: "I3o0GW1Yn7OXtWUpQo0c", text: "hi" },
    { id: 2, uid1: "CcUPvFvXy3eRp0jgnfJE", text: "hello" },
    { id: 3, uid1: "I3o0GW1Yn7OXtWUpQo0c", text: "how are you" },
  ];

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
            //console.log(message.uid1[0]);
            if (message.uid1[0] === chatFriendId) {
              return (
                <>
                  <p style={friendChatBox} key={message.id}>
                    {message.text}
                    {/* {chatFriendId}\\\
                  {message.uid1[0]} */}
                  </p>
                  <span ref={dummy}></span>
                </>
              );
            } else {
              return (
                <>
                  <p style={myChatBox} key={message.id}>
                    {message.text}
                    {/* {chatFriendId}\\\
                  {message.uid1[0]} */}
                  </p>
                  <span ref={dummy}></span>
                </>
              );
            }
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

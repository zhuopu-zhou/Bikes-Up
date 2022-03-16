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
  updateDoc,
  doc,
  limit,
} from "@firebase/firestore";
import "./Chat.css";

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
      where("uids", "==", [...uid]),
      orderBy("timeStamp")
      //limit(10)
    );

    onSnapshot(q1, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getMsg(msgsCollectionRef);
  }, []);

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

    // const userDoc = doc(db,"users",userid)
    // const newFields = {counter: "newmsg"}
    // await updateDoc(userDoc,newFields)
  };

  const goToList = () => {
    setChat(false);
    localStorage.setItem("chat", false);
    setChatFriendId("");
    localStorage.setItem("friendId", "");
  };

  const dummyMsg = [
    { id: 1, uid1: "I3o0GW1Yn7OXtWUpQo0c", text: "hi" },
    { id: 2, uid1: "CcUPvFvXy3eRp0jgnfJE", text: "hello" },
    { id: 3, uid1: "I3o0GW1Yn7OXtWUpQo0c", text: "how are you" },
  ];

  return (
    <section className="container">
      <div className="chatHeader">
        <h1 className="title">BIKE'S UP </h1>
        <div className="userDiv">
          <button onClick={goToList} className="userBtn">
            Back
          </button>
        </div>
      </div>

      <section className="chatList">
        {!messages ? (
          <h2>Loading...</h2>
        ) : (
          messages.map((message) => {
            //console.log(message.uid1[0]);
            if (message.uid1[0] === chatFriendId) {
              return (
                <div className="friendChatBar">
                  {/* <p className="avatarBox">zz</p> */}
                  <p className="friendChatbox" key={message.id}>
                    {message.text} 
                    {/* {chatFriendId}\\\
                  {message.uid1[0]} */}
                  </p>
                  <span ref={dummy}></span>
                </div>
              );
            } else {
              return (
                <div className="myChatBar">
                  
                  <p className="myChatbox" key={message.id}>
                    {message.text} 
                    {/* {chatFriendId}\\\
                  {message.uid1[0]} */}
                  </p>
                  {/* <p className="avatarBox">AB</p> */}
                  <span ref={dummy}></span>
                </div>
              );
            }
          })
        )}
      </section>

      <div className="footer">
        <form onSubmit={(e) => sendNewMsg(e)}>
          <input
            placeholder="Text Here ..."
            value={newMessage}
            onChange={(e) => setNewmessage(e.target.value)}
            className="msg"
          />
          <button type="submit" disabled={!newMessage} className="sendBtn">
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

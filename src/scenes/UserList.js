import { useEffect, useState } from "react";
import "./UserList.css";

export default function UserList({
  token,
  setToken,
  userid,
  setUserid,
  setChat,
  chatFriendId,
  setChatFriendId,
}) {
  const [userList, setUserList] = useState();
  useEffect(() => {
    fetch("https://auth-test-zz.uc.r.appspot.com/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.users);
        console.log(userid);
        setUserList(data.users.filter((user) => user.id !== userid));
        console.log(userid);
      })
      .catch(alert);
  }, [token, userid]); //add userList to dependency
  const handleLogout = () => {
    setToken("");
    localStorage.setItem("token", "");
    setUserid("");
    localStorage.setItem("id", "");
  };

  const goToChat = () => {
    setChat(true);
    localStorage.setItem("chat", true);
  };

  const text = {
    backgroundColor: "hsl(201deg 100% 85%)",
    border: "1px solid white",
    borderRadius: "0.2em",
    width: "8em",
    color: "white",
    textAlign: "center",
  };

  const chatBtn = {
    borderRadius: "1em",
    border: "1px solid white",
    color: "white",
    backgroundColor: "hsl(201deg 100% 85%)",
  };

  return (
    <section className="container">
      <div className="userListHeader">
        <h1 className="userTitle">BIKE'S UP</h1>
      </div>

      <section className="userList">
        {!userList ? (
          <h2>Loading...</h2>
        ) : (
          userList.map((user) => {
            return (
              <div key={user.id} className="userBox">
                <button
                  onMouseEnter={() => {
                    setChatFriendId(user.id);
                    localStorage.setItem("friendId", user.id);
                  }}
                  onMouseLeave={() => {
                    setChatFriendId("");
                    localStorage.setItem("friendId", "");
                  }}
                  onClick={goToChat}
                  className="chatBtn"
                >
                  <img className="img"  src="https://idronline.org/wp-content/uploads/2021/01/Screen-Shot-2019-02-19-at-1.23.40-PM-300x300-3.jpg" alt="dummyProfile"/>
                  <div className="userSide">
                    <div className="name">{user.username}</div>
                    <div className="chat">Tap to chat</div>
                  </div>
                </button>
              </div>
            );
          })
        )}
      </section>
      <div className="userFooter">
        <div className="line"></div>
        <div className="logoutBar">
          <button className="logoutBtn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </section>
  );
}

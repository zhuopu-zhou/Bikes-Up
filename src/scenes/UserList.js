import { useEffect, useState } from "react";

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
  }, [token, userid]);
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
  const [logBg, setLogBg] = useState("hsl(201deg 100% 85%)");
  const logout = {
    borderRadius: "1em",
    border: "1px solid white",
    color: "white",
    backgroundColor: logBg,
  };
  const list = {
    overflow: "scroll",
    height: "260px",
    backgroundColor: "hsl(201deg 100% 95%)",
  };
  const userbox = {
    border: "2px solid hsl(201deg 100% 85%)",
    borderRadius: "0.3em",
    margin: "0px",
    marginBottom: "3px",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "hsl(201deg 100% 95%)",
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
    <section style={container}>
      <h1 style={title}>CYCLE UP</h1>
      <div style={{ width: "250px", backgroundColor: "hsl(201deg 100% 85%)" }}>
        <button
          style={logout}
          onClick={handleLogout}
          onMouseEnter={() => setLogBg("hsl(201deg 100% 55%)")}
          onMouseLeave={() => setLogBg("hsl(201deg 100% 85%)")}
        >
          Logout
        </button>
      </div>
      <br />

      <section style={list}>
        {!userList ? (
          <h2>Loading...</h2>
        ) : (
          userList.map((user) => {
            return (
              <div
                key={user.id}
                // onClick={() => {
                //   setChatFriendId(user.id);
                //   localStorage.setItem("friendId", user.id);
                // }}
                style={userbox}
              >
                <div style={text}>{user.username}</div>
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
                  style={chatBtn}
                >
                  chat
                </button>
              </div>
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
        }}
      ></div>
    </section>
  );
}



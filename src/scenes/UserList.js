import { useEffect, useState } from "react";

export default function UserList({
  token,
  setToken,
  userid,
  setChat,
  setChatFriendId,
}) {
  const [userList, setUserList] = useState();
  useEffect(() => {
    fetch("http://localhost:3001/users", {
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
  };

  const goToChat = () => {
    setChat(true);
    localStorage.setItem("chat", true);
  };

  

  return (
    <>
      <h1>User List Component</h1>
      {!userList ? (
        <h2>Loading...</h2>
      ) : (
        userList.map((user) => {
          return (
            <p key={user.id}
            onClick={()=>{setChatFriendId(user.id)
            localStorage.setItem("friendId",user.id)
            }}
            >
              {user.username}||||{user.id}||||
              <button onClick={goToChat}>GoToCHat</button>
              
              
            </p>
          );
        })
      )}

      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

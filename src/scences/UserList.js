import { useEffect, useState } from "react";

export default function UserList({ token, setToken }) {
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
      .then((data) => setUserList(data.users))
      .catch(alert);
  }, [token]);
  const handleLogout = () => {
    setToken(null);
    localStorage.setItem("token", null);
  };
  return (
    <>
      <h1>User List Component</h1>
      {!userList ? (
        <h2>Loading...</h2>
      ) : (
        userList.map((user) => {
          return (
            <p key={user.id}>
              {user.email}, {user.userRole}
            </p>
          );
        })
      )}
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default function Chat({setChat}) {
    const goToList = () => {
        setChat(false);
        localStorage.setItem("chat","")
      };
  return (
    <>
      <h1>Chat room</h1>
      <section>here goes the chat</section>
      <button onClick={goToList}>go to user list</button>
    </>
  );
}

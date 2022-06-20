import { useRef, useEffect } from "react";
import "./Sample.css";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Chat(props) {
  const divRef = useRef(null);
  let curuser = localStorage.getItem("username");
  const histroy = useHistory();
  // eslint-disable-next-line no-unused-vars
  const { data, ispending, error } = useFetch(
    `http://localhost:5000/get_chat/${curuser}/${props.chatuser}`
  );
  useEffect(() => {
    if (!curuser) histroy.push("/");
  }, []);
  const user = localStorage.getItem("username");

  console.log(data);
  return (
    <>
      <div className='rows'>
        {data &&
          data.map(({ sender, receiver, msg }) => (
            <>
              {sender === user && <SentMessage user={sender} content={msg} />}
              {receiver === user && (
                <ReceiveMessage user={sender} content={msg} />
              )}
            </>
          ))}

        {/* <ReceiveMessage user='Lucy' content='Hello there!'/>
    <SentMessage user='Natsu' content="How's it going"/>
    <ReceiveMessage user='Lucy' content='Its going fine, what about you?'/>
    <SentMessage user='Natsu' content="dont even get me started"/>
    <ReceiveMessage user='Lucy' content='woah alright'/>
    <SentMessage user='Natsu' content="ttyl bye !"/>
    <ReceiveMessage user='Lucy' content='Its going fine, what about you?'/>
    <SentMessage user='Natsu' content="dont even get me started"/>
    <ReceiveMessage user='Lucy' content='woah alright'/>
    <SentMessage user='Natsu' content="ttyl bye !"/> */}
      </div>
      <div ref={divRef} />
    </>
  );
}

function ReceiveMessage(props) {
  return (
    <div className='message receive'>
      <h3>&ensp;{props.user}</h3>
      <p>&ensp;{props.content}</p>
    </div>
  );
}

function SentMessage(props) {
  return (
    <div className='message sent'>
      <h3>&ensp;{props.user}</h3>
      <p>&ensp;{props.content}</p>
    </div>
  );
}
export default Chat;

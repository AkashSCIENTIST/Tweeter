/* eslint-disable no-unused-vars */
import ChatUsers from "./ChatUsers";
import Chat from "./Chat";
import UserData from "./UserData";
import "./Sample.css";
import { useState, useEffect } from "react";
import axios from "axios";

function ChatPage(props) {
  const [formValue, setFormValue] = useState();
  const [data, setData] = useState();
  const [chatUser, setChatUser] = useState();

  function post(url, body, callback) {
    let headers = new Headers();
    console.log(headers);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "http://localhost:5000");
    let formData = new FormData();
    for (const [key, value] of Object.entries(body)) {
      formData.append(key, value);
    }
    console.log(formData);

    fetch(url, {
      method: "POST",
      mode: "no-cors",
      credentials: "include",
      headers: headers,
      body: formData,
    })
      .then((json) => {
        callback(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changeUser(user) {
    setChatUser(user);
  }

  useEffect(() => {
    axios.get("http://localhost:5000/all_users").then((res) => {
      console.log("allusers:", res.data);
      setData(res.data);
    });
  }, []);

  function sentHandler(e) {
    const body = {
      sender: localStorage.getItem("username"),
      receiver: chatUser,
      msg: formValue,
    };
    alert(JSON.stringify(body));
    post("http://localhost:5000/new_chat_msg", body, (res) => {
      console.log(res);
      window.location.reload();
    });
  }
  return (
    <>
      <div>
        <div className='row'>
          <div className='column left'>
            <h3>All Users:</h3>
            <br></br>
            {data &&
              data.map((user) => (
                <>
                  <div onClick={(e) => changeUser(user.username)}>
                    <p className='chat_user_style'>{user.username}</p>
                  </div>
                  <br></br>
                </>
              ))}
          </div>
          <div className='column right'>
            <h1>Chat User : {chatUser}</h1>
            <br></br>
            <Chat chatuser={chatUser} />
            <br></br>
            <span></span>
            <form className='textbox'>
              <input
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                placeholder='Let the fun begin ...'
              />
              <button type='submit' disabled={!formValue} onClick={sentHandler}>
                🕊️
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

function UserName(props) {
  return (
    <>
      <div className='username'>
        <h3>
          &ensp;
          <UserData username={props.username} />
          {/* &ensp;{props.name}   */}
        </h3>
      </div>
    </>
  );
}

export default ChatPage;

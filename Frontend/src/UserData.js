//import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./logo512.png";
//import React, { useEffect } from "react";

function UserData(props) {
  //console.log("pops of userdata: ", props);
  useEffect(() => {}, []);

  return (
    <>
      <Link to={`/user/${props.username}`}>
        <div className='userdata'>
          {!props.photo && (
            <img src={logo} alt='profilephoto' className='user_image' />
          )}
          {props.photo && (
            <img
              src={`data:image/jpg;base64,${props.photo}`}
              alt='profilephoto'
              className='user_image'
            />
          )}
          {props.username && <div>{" " + props.username}</div>}
          {!props.username && <div>Demo User/Group</div>}
        </div>
        <br></br>
      </Link>
    </>
  );
}

export default UserData;

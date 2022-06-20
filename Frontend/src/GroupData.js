import { useEffect, useState } from "react";
import logo from "./logo512.png";
//import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function GroupData(props) {
  const [data, setData] = useState();
  useEffect(() => {
    axios.get("http://localhost:5000/all_groups").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <>
      <a href='/new_group' className='nounderline'>
        <button
          style={{
            color: "#fafafa",
            backgroundColor: "#1DA1F2",
            borderRadius: "8px",
            paddingRight: "15px",
            borderColor: "#1DA1F2",
          }}>
          + New Group
        </button>
      </a>
      <br></br>
      <br></br>
      <div className='carousel'>
        <div className='userdata'>
          {data &&
            data.map((group) => (
              <Link
                to={`/group/${group.grpname}`}
                className='nounderline'
                key={group.grpname}>
                {!group.photo && (
                  <img src={logo} alt='profilephoto' className='user_image' />
                )}
                {group.photo && (
                  <img
                    src={`data:image/jpg;base64,${group.photo}`}
                    alt='profilephoto'
                    className='user_image'
                  />
                )}
                <br />
                {group.grpname && <div>{group.grpname}</div>}
                {!group.grpname && <div>Demo User/Group</div>}
              </Link>
            ))}
        </div>
      </div>
    </>
  );
}

export default GroupData;

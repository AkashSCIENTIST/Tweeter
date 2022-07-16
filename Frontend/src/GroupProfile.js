/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import "./profile.css";
import image from "./logo512.png";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GroupProfile = (props) => {
  function post(url, body, callback) {
    let headers = new Headers();

    console.log(headers);
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "http://localhost:5000");

    console.log(body);
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
  const { groupname } = useParams();
  const [groupName, setGroupName] = useState();
  const histroy = useHistory();
  const [desc, setDesc] = useState();
  const [photo, setPhoto] = useState();
  const [admin, setAdmin] = useState();
  const [isMember, setIsMember] = useState();
  const [grpmem, setGrpmem] = useState([]);
  const curuser = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/group_detail/${groupname}/${curuser}`)
      .then((res) => {
        console.log(res,res.data.isMember);
        // console.log(res.data.members);
        setAdmin(res.data.data[0].group_admin);
        setPhoto(res.data.data[0].photo);
        setDesc(res.data.data[0].description);
        setGroupName(res.data.data[0].grpname);
        setIsMember(res.data.isMember);
        setGrpmem([...res.data.members]);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupname]);

  function joinHandler() {
    const data = { grpname: groupName, username: curuser };
    post(`http://localhost:5000/join_group`, data, () => {
      console.log(data);
      //histroy.push("/groups");
      window.location.reload();
    });
  }

  function leaveHandler() {
    const data = { grpname: groupName, username: curuser };
    post(`http://localhost:5000/leave_group`, data, () => {
      console.log(data);
      window.location.reload();
    });
  }

  return (
    <div className='GroupProfile'>
      <div className='split left'>
        <center>
          <div>
            {photo && (
              <img src={`data:image/jpg;base64,${photo}`} alt='profile picture' className='image' />
            )}
            {!photo && (
              <img src={image} alt='profile picture' className='image' />
            )}
          </div>
        </center>
      </div>

      <div className='split right'>
        {groupName && <h1>{groupName}</h1>}
        {!groupName && <h1> GroupName </h1>}
        <br></br>
        {admin && <h3>@{admin}</h3>}
        {!admin && <h3>Admin</h3>}
        <br></br>
        {!isMember && <button onClick={joinHandler} className="cursor_pointer">Join</button>}
        {isMember && <button onClick={leaveHandler} className="cursor_pointer">Leave</button>}
        <br></br>
        <br></br>
        {desc && <p>{desc}</p>}
        {!desc && (
          <p>
            "Rodney Erickson is a content marketing professional at HubSpot, an
            inbound marketing and sales platform that helps companies attract
            visitors, convert leads, and close customers. Previously, Rodney
            worked as a marketing manager for a tech software startup. He
            graduated with honors from Columbia University with a dual degree in
            Business Administration and Creative Writing."

          </p>
        )}
        <div>
          <br></br>
          <h3>Group Members</h3>
          <br></br>

            <div className="carousel">
      {grpmem &&
            grpmem.map((user) => (
          <div key={user.username}>
            <Link to={`/user/${user.username}`} target='_blank' className="nounderline">
              <div>
                {!user.photo && (
                  <img src={image} alt='profilephoto' className='user_image' />
                )}
                {user.photo && (
                  <img
                    src={`data:image/jpg;base64,${user.photo}`}
                    alt='profilephoto'
                    className='user_image'
                  />
                )}
                <br></br>
                {user.username && <div>{" " + user.username}</div>}
                {!user.username && <div>Demo User/Group</div>}
              </div>
            </Link>
          </div>
        ))}
    </div>
        </div>
      </div>
    </div>
  );
};

export default GroupProfile;

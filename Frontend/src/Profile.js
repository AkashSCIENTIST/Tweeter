/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import "./profile.css";
import image from "./logo512.png";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = ({ data }) => {
  console.log("profile : ", data);
  const curUser = localStorage.getItem("username");
  const [user, setUser] = useState(data.username);
  const [isFollowing, setIsFollowing] = useState(true);

  useEffect(() => {
    var query = `http://localhost:5000/is_following?curuser=${curUser}&user=${user}`;
    console.log(query);
    axios.get(query).then((response) => {
      setIsFollowing(response.data.is_following);
      console.log(isFollowing);
      console.log(response);
    });
  });

  const handleFollow = (e) => {
    axios
      .get(`http://localhost:5000/new_follow?curuser=${curUser}&user=${user}`)
      .then((response) => {
        console.log(response);
        window.location.reload();
      });
  };

  const handleUnfollow = (e) => {
    axios
      .get(`http://localhost:5000/new_unfollow?curuser=${curUser}&user=${user}`)
      .then((response) => {
        console.log(response);
        window.location.reload();
      });
  };

  return (
    <>
      <div className='profile'>
        <div className='split left'>
          <center>
            <div>
              {data.photo && (
                <img
                  src={`data:image/jpg;base64,${data.photo}`}
                  alt='profile picture'
                  className='image'
                />
              )}
              {!data.photo && (
                <img src={image} alt='profile picture' className='image' />
              )}
            </div>
          </center>
        </div>

        <div className='split right'>
          {data.username && <h1>@{data.username}</h1>}
          {!data.username && <h1> UserName </h1>}
          {data.fname + data.lname && (
            <h3>{data.fname + " " + data.lname}</h3>
          )}
          {!(data.fname + data.lname) && <h3> Name </h3>}
          {data.website && (
            <a href={`${data.website}`} target='_blank' rel='noreferrer'>
              <h5>{data.website}</h5>
            </a>
          )}
          {data.loc && <h6>Location: {data.loc}</h6>}
          {data.joined_from && (
            <h6>{"Joined from : " + data.joined_from}</h6>
          )}
          {!data.joined_from && <h6> Joined From </h6>}
          {curUser !== user && (
            <>
              <br></br>
              {!isFollowing && <button onClick={handleFollow}>Follow</button>}
              {isFollowing && (
                <button onClick={handleUnfollow}>UnFollow</button>
              )}
              <br></br>
            </>
          )}
          <br></br>
          <p>{data.bio}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;

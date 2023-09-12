/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import "./profile.css";
import image from "./logo512.png";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import MiniTweet from "./MiniTweet";

const Profile = ({ data }) => {
  console.log("profile : ", data);
  const curUser = localStorage.getItem("username");
  const [user, setUser] = useState(data.profile.username);
  const [isFollowing, setIsFollowing] = useState(true);
  const [followers, setFollowers] = useState(data.followers);

  useEffect(() => {
    var query = `http://localhost:5000/is_following?curuser=${curUser}&user=${user}`;
    console.log(query);
    axios.get(query).then((response) => {
      setIsFollowing(response.data.is_following);
      console.log(response);
    });
  });

  const handleFollow = (e) => {
    axios
      .get(`http://localhost:5000/new_follow?curuser=${curUser}&user=${user}`)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUnfollow = (e) => {
    axios
      .get(`http://localhost:5000/new_unfollow?curuser=${curUser}&user=${user}`)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className='profile'>
        <div className='split profileleft'>
          <center>
            <div>
              {data.profile.photo && (
                <img
                  src={`data:image/jpg;base64,${data.profile.photo}`}
                  alt='profile picture'
                  className='image'
                />
              )}
              {!data.profile.photo && (
                <img src={image} alt='profile picture' className='image' />
              )}
            </div>
          </center>
          <div className='profilecarousel'>
            <div>Followed by :</div>
          </div>
          <div className='profilecarousel'>
            {followers &&
              followers.map((user) => (
                <div key={user.username}>
                  <Link
                    to={`/user/${user.username}`}
                    target='_blank'
                    className='nounderline'>
                    <div>
                      {!user.photo && (
                        <img
                          src={image}
                          alt='profilephoto'
                          className='user_image'
                        />
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

        <div className='split profileright'>
          {data.profile?.username && <h1>@{data.profile.username}</h1>}
          {!data.profile?.username && <h1> UserName </h1>}
          {data.profile?.fname + data?.lname && (
            <h3>{data.profile.fname + " " + data.profile.lname}</h3>
          )}
          {!(data.profile?.fname + data?.lname) && <h3> Name </h3>}
          {data.profile.website && (
            <a
              href={`${data.profile?.website}`}
              target='_blank'
              rel='noreferrer'>
              <h5>{data.profile.website}</h5>
            </a>
          )}
          {data.profile?.loc && <h6>Location: {data.profile.loc}</h6>}
          {data.profile?.joined_from && (
            <h6>{"Joined from : " + data.profile.joined_from}</h6>
          )}
          {!data.profile?.joined_from && <h6> Joined From </h6>}
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
          <p>{data?.profile?.bio}</p>
          <br></br>
          {data.tweets &&
            data.tweets.map((tweet) => (
              <>
                <MiniTweet
                  key={tweet.tweetid}
                  userphoto={tweet.userphoto}
                  name={tweet.author}
                  username={tweet.username}
                  time={"Today"}
                  content={tweet.content_}
                  tweetid={tweet.tweetid}
                  photo={tweet.photo}
                />
                <br></br>
              </>
            ))}
          {!data && <Loading />}
        </div>
      </div>
    </>
  );
};

export default Profile;

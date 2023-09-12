import useFetch from "./useFetch";
import Loading from "./Loading";
import Error from "./Error";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import logo from "./logo512.png";

function Tweet(props) {
  const curUser = localStorage.getItem("username");
  const pageid = useParams();
  console.log("page id : ", pageid);
  const {
    data: tweet,
    isPending,
    error,
  } = useFetch(`http://localhost:5000/tweet/${props.tweetid}`);
  if (!isPending && !error) {
    console.log("Tweet details : ", tweet);
  }
  useEffect(() => {}, []);
  useEffect(() => {
    props.updater(1);
  });

  return (
    <>
      {isPending && <Loading />}
      {error && <Error />}
      {tweet &&
        !isPending &&
        tweet.map((data) => (
          <div className='tweet' key={`tweet_id_${data.tweetid}`}>
            <div className='tweetheader'>
              {data.userphoto && (
                <img
                  src={`data:image/jpg;base64,${data.userphoto}`}
                  alt='profilephoto'
                  className='headerphoto'
                />
              )}
              {!data.userphoto && (
                <img src={logo} alt='profilephoto' className='headerphoto' />
              )}
              <h2>{data.username}</h2>
            </div>
            <br></br>
            <br></br>
            <b>{data.content_}</b>
            <br></br>
            <br></br>
          </div>
        ))}
    </>
  );
}

export default React.memo(Tweet);

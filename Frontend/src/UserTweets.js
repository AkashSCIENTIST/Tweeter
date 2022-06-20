import { useEffect, useState } from "react";
import MiniTweet from "./MiniTweet";
import "./tweetpage.css";
import "./profile.css";
import { Link } from "react-router-dom";

function UserTweets(props) {
  console.log("usertweets : ", props);
  const { username } = props;
  const [data, setData] = useState();
  const [counter, setCounter] = useState();
  console.log(username);
  useEffect(() => {
    fetch(`http://localhost:5000/tweets_by_user/${username}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setData(json);
        return;
      });
  }, [username]);
  console.log(data);

  return (
    <>
      {data &&
        data.map((tweet) => (
          <>
            {/* <a href={`http://localhost:5000/tweetpage/${tweet.tweetid}`} target="_blank" rel="noreferrer"> */}
            <MiniTweet
              key={counter}
              counter={counter}
              setCounter={setCounter}
              userphoto={tweet.userphoto}
              name={tweet.author}
              username={tweet.username}
              time={"Today"}
              content={tweet.content_}
              tweetid={tweet.tweetid}
              photo={tweet.photo}
            />

            <br></br>
            {/* </a> */}
          </>
        ))}
    </>
  );
}

export default UserTweets;

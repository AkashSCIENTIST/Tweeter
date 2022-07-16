import { useEffect, useState } from "react";
import MiniTweet from "./MiniTweet";
import "./profile.css";
import "./tweetpage.css";
import Loading from "./Loading";

function UserTweets(props) {
  //console.log("usertweets : ", props);
  const { username } = props;
  const [data, setData] = useState();
  const [counter, setCounter] = useState(0);
  //console.log(username);
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

  return (
    <>
      {data && 
        data.map((tweet) => (
          <>
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
          </>
        ))} 
      {!data && <Loading/>}
    </>
  );
}

export default UserTweets;

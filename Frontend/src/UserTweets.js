import { useEffect, useState } from "react";
import MiniTweet from "./MiniTweet";
import "./profile.css";
import "./tweetpage.css";
import Loading from "./Loading";
import axios from "axios";

function UserTweets(props) {
  //console.log("usertweets : ", props);
  const { username } = props;
  const [data, setData] = useState();
  const [counter, setCounter] = useState(0);
  //console.log(username);
  useEffect(() => {
    axios.get(`http://localhost:5000/tweets_by_user/${username}`)
      .then((res) => {
        console.log('tweets', res.data);
        setData(res.data);
      });
  }, [username]);

  return (
    <div className='tweets'>
      {data &&
        data.map((tweet) => (
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
  );
}

export default UserTweets;

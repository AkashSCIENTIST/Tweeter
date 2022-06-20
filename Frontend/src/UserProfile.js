import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Profile from "./Profile";
import UserTweets from "./UserTweets";
import "./profile.css";
import axios from "axios";

function UserProfile() {
  const { username } = useParams();
  const [data, setData] = useState();
  console.log(username);
  useEffect(() => {
    axios.get(`http://localhost:5000/user/${username}`).then((res) => {
      setData(res.data[0]);
      console.log("User Profile", res.data[0]);
      //alert("User profile \n", JSON.stringify(res.data));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='flex'>
      <div>{data && <Profile data={data} />}</div>
      <div className='center'>
        <div className='head'>Tweets</div>
        <UserTweets username={username} />
        End of Tweets
      </div>
    </div>
  );
}

export default UserProfile;

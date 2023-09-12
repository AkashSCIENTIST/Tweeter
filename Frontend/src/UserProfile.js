import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Profile from "./Profile";
import UserTweets from "./UserTweets";
import "./profile.css";
import axios from "axios";
import Loading from "./Loading";

function UserProfile() {
  const { username } = useParams();
  const [data, setData] = useState();
  console.log(username);
  useEffect(() => {
    axios.get(`http://localhost:5000/user/${username}`).then((res) => {
      setData(res.data);
      console.log("User Profile", res.data);
      //alert("User profile \n", JSON.stringify(res.data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {data && (
        <div>
          <div className='flex'>
            {data && <Profile data={data} />}
            {/* {data && <UserTweets username={username} />} */}
          </div>
        </div>
      )}
      {!data && <Loading />}
    </>
  );
}

export default UserProfile;

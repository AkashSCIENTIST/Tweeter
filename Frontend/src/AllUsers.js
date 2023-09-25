import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo512.png";

function AllUsers() {
  const [data, setData] = useState();

  useEffect(() => {
    axios.get("http://localhost:5000/all_users").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <div className='carousel'>
      {data &&
        data.map((user) => (
          <div key={user.username}>
            <Link to={`/user/${user.username}`} className='nounderline'>
              <div>
                {!user.userphoto && (
                  <img src={logo} alt='profilephoto' className='user_image' />
                )}
                {user.userphoto && (
                  <img
                    src={`data:image/jpg;base64,${user.userphoto}`}
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
  );
}

export default AllUsers;

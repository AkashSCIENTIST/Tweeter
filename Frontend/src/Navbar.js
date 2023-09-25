import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [username, setUserName] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    setUserName(localStorage.getItem("username"));
  }, [username]);

  const onLogOut = () => {
    console.log("LogOut Page");
    localStorage.removeItem("username");
    window.location.reload(true);
    history.push("/");
  };

  return (
    <div className='navbar'>
      <a href='/' className='logo'>
        <h1 className='stylish_logo'>🪶Tweeter</h1>
        {username && (
          <p>
            &nbsp;&nbsp;user:
            <a href={`/user/${username}`} rel='noreferrer'>
              {username}
            </a>
          </p>
        )}
      </a>
      <div className='links'>
        {username && (
          <>
            <Link to='/'>🏠 Home</Link>
            <Link to='/groups'>💖 Groups</Link>
            <Link to='/users'>🧔🏻 Users</Link>
            <Link to='/polls'>🚀 Polls</Link>
            {/* <Link to='/chats'>📜 Chats</Link> */}
            <Link to='/' onClick={onLogOut}>
              🏃🏻‍♀️ Log Out
            </Link>
            <Link
              to='/create'
              style={{
                color: "#fafafa",
                backgroundColor: "#1DA1F2",
                borderRadius: "8px",
                paddingRight: "15px",
              }}>
              + New Tweet
            </Link>
          </>
        )}
        {!username && (
          <>
            <Link to='/signin'>Sign In</Link>
            <Link
              to='/signup'
              style={{
                color: "#fafafa",
                backgroundColor: "#1DA1F2",
                borderRadius: "8px",
              }}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

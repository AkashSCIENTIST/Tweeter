import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const [username, setUserName] = useState(null);
  const history = useHistory();

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
      <a href='/'>
        <h1 className='stylish_logo'>πͺΆTweeter</h1>
        {username && (
          <p>
            &nbsp;&nbsp;user:
            <a href={`/user/${username}`} target='_blank' rel='noreferrer'>
              {username}
            </a>
          </p>
        )}
      </a>
      <div className='links'>
        {username && (
          <>
            <Link to='/'>π  Home</Link>
            <Link to='/groups'>π Groups</Link>
            <Link to='/users'>π§π» Users</Link>
            <Link to='/polls'>π Polls</Link>
            <Link to='/chats'>π Chats</Link>
            <Link to='/' onClick={onLogOut}>
              ππ»ββοΈ Log Out
            </Link>
            <Link
              to='/create'
              style={{
                color: "#fafafa",
                backgroundColor: "#1DA1F2",
                borderRadius: "8px",
                paddingRight:"15px"
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

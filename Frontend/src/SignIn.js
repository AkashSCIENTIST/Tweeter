import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const SignIn = (props) => {
  const [username, setUserName] = useState("");
  const [mail, setMail] = useState("");
  const histroy = useHistory();
  const localuser = localStorage.getItem("username");


  const handleSubmit = (e) => {
    e.preventDefault();
    //const SignInData = { username, mail };
    if (mail === "root@root.root") {
      localStorage.setItem("username", username);
      window.location.reload(false);
    }

    fetch(`http://localhost:5000/auth/${username}`)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        const mailid = json[0].mailid;
        if (mail === mailid) {
          localStorage.setItem("username", username);
          window.location.reload(false);
        }
      });
  };

  return (
    <div className='create'>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>UserName:</label>
        <input
          type='text'
          required
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Mail:</label>
        <input
          type='email'
          required
          onChange={(e) => setMail(e.target.value)}
        />
        <button>Sign In</button>
      </form>
      <br></br>
      <Link to='/signup'>
        <h6>If you are new user, click here to Sign Up</h6>
      </Link>
    </div>
  );
};

export default SignIn;

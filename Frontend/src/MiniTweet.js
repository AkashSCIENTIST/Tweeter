//import { useEffect } from "react";
import "./tweetpage.css";
import logo from "./logo512.png";

function MiniTweet(props) {
  //console.log("mini tweet : ", props);
  return (
    <div className='tweet'>
      {/* <Link to={`/tweetpage/${props.tweetid}`} className="nounderline" target={"_blank"}> */}
      <a href={`/tweetpage/${props.tweetid}`} target='_blank' rel='noreferrer' className="nounderline">
        <div className='tweetheader'>
          {props.userphoto && (
            <img
              src={`data:image/jpg;base64,${props.userphoto}`}
              alt='profilephoto'
              className='headerphoto'
            />
          )}
          {!props.userphoto && (
            <img src={logo} alt='profilephoto' className='headerphoto'></img>
          )}
          <h2>{props.name}</h2>
        </div>
        <br></br>
        <b>{props.content}</b>
        <br></br>
      </a>
      {/* </Link> */}
    </div>
  );
}

export default MiniTweet;

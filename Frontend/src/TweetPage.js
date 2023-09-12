import { useState, useEffect } from "react";
import "./tweetpage.css";
import { useParams } from "react-router-dom";
import logo from "./logo512.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";

function post(url, body, callback) {
  let headers = new Headers();
  const navigate = useNavigate();
  console.log(headers);
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Origin", "http://localhost:5000");

  console.log(body);
  let formData = new FormData();
  for (const [key, value] of Object.entries(body)) {
    formData.append(key, value);
  }
  console.log(formData);

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    credentials: "include",
    headers: headers,
    body: formData,
  })
    .then((json) => {
      callback(json);
    })
    .catch((err) => {
      console.log(err);
    });
}

function TweetPage(props) {
  const username = localStorage.getItem("username");
  const { tweetid: tweet_page_id } = useParams();
  const [content, setContent] = useState("");
  const [tweetid, setTweetid] = useState(1);
  const [tweetData, setTweetData] = useState();
  const [comments, setComments] = useState();
  const [likes, setLikes] = useState();
  const [isLiked, setIsLiked] = useState();

  function submitHandler(e) {
    if (content !== "") {
      post(
        "http://localhost:5000/new_comment",
        { username, content, tweet_id: tweet_page_id },
        (res) => {
          console.log(res);
          window.location.reload(false);
        },
      );
    }
  }

  function likeHandler() {
    const data = {
      tweet_id: tweet_page_id,
      user_id: username,
    };
    console.log(JSON.stringify(data));
    post(`http://localhost:5000/new_like`, data, () => {
      window.location.reload();
    });
  }

  function UnlikeHandler() {
    const data = {
      tweet_id: tweet_page_id,
      user_id: username,
    };
    console.log(JSON.stringify(data));
    post(`http://localhost:5000/new_unlike`, data, () => {
      window.location.reload();
    });
  }

  function deleteTweetHandler() {
    confirmAlert({
      title: "Delete Tweet",
      message: "Confrm ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .get("http://localhost:8000/delete_tweet/{}".format(tweet_page_id))
              .then((res) => {
                toast("Order Placed", {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
                navigate("/");
              })
              .catch((err) => {
                console.log(err);
                toast(`Error Occured`, {
                  position: "bottom-right",
                  autoClose: 400,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  }

  function deleteCommentHandler() {}

  useEffect(() => {
    if (tweet_page_id) {
      setTweetid(tweet_page_id);
    }
    axios
      .get(`http://localhost:5000/full_tweet/${tweet_page_id}`)
      .then((data) => {
        console.log(data.data);
        setTweetData(data.data.tweet);
        setLikes(data.data.likes);
        setComments(data.data.comments);
        setIsLiked(data.data.liked_users.includes(username));
      });
  }, []);

  return (
    <>
      <div>
        <div>
          {/*Tweet Section*/}
          <div>
            {tweetData &&
              tweetData.map((data) => (
                <div className='tweet' key={`tweet_id_${data.tweetid}`}>
                  <Link
                    to={`/user/${data.username}`}
                    target='_blank'
                    className='nounderline'>
                    <div className='tweetheader'>
                      {data.userphoto && (
                        <img
                          src={`data:image/jpg;base64,${data.userphoto}`}
                          alt='profilephoto'
                          className='headerphoto'
                        />
                      )}
                      {!data.userphoto && (
                        <img
                          src={logo}
                          alt='profilephoto'
                          className='headerphoto'
                        />
                      )}
                      <h2>{data.username}</h2>
                    </div>
                  </Link>
                  <br></br>
                  <br></br>
                  <b>{data.content_}</b>
                  <br></br>

                  {data.username === username && (
                    <>
                      <br></br>
                      <button
                        style={{
                          color: "#fafafa",
                          backgroundColor: "#3DA3F4",
                          borderRadius: "8px",
                          borderColor: "#3DA3F4",
                          cursor: "pointer",
                        }}
                        onClick={deleteTweetHandler}>
                        Delete
                      </button>
                    </>
                  )}
                  <br></br>
                </div>
              ))}
          </div>
          {/*Comment Section */}
          <br />
          <br />
          <div className='comment_section'>
            <h2>Comments</h2>
            <br></br>
            <div className='comment_header'>
              <input
                type='text'
                required
                placeholder='Comment Here ...'
                className='commentbox'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  borderColor: "#1DA1F2",
                }}
              />
              <i> </i>
              <button
                style={{
                  color: "#fafafa",
                  backgroundColor: "#3DA3F4",
                  borderRadius: "8px",
                }}
                className='commentbutton'
                onClick={submitHandler}>
                🚩Post
              </button>
              <br></br>
              <br></br>
            </div>

            {/*Like Section*/}
            <div>
              <br></br>
              Likes
              <br />
              {!isLiked && (
                <>
                  <button
                    style={{
                      color: "#fafafa",
                      backgroundColor: "#3DA3F4",
                      borderRadius: "8px",
                      borderColor: "#3DA3F4",
                    }}
                    onClick={likeHandler}>
                    Like 💖
                  </button>
                </>
              )}
              {isLiked && (
                <>
                  <button
                    style={{
                      color: "#3DA3F4",
                      backgroundColor: "white",
                      borderRadius: "8px",
                      borderColor: "#3DA3F4",
                    }}
                    onClick={UnlikeHandler}>
                    Unlike 💔
                  </button>
                </>
              )}
              <br></br>
              <br />
              <div className='carousel'>
                {likes &&
                  likes.map((like) => (
                    <Link
                      to={`/user/${like.username}`}
                      target='_blank'
                      className='nounderline'>
                      <div>
                        {!like.userphoto && (
                          <img
                            src={logo}
                            alt='profilephoto'
                            className='user_image'
                          />
                        )}
                        {like.userphoto && (
                          <img
                            src={`data:image/jpg;base64,${like.userphoto}`}
                            alt='profilephoto'
                            className='user_image'
                          />
                        )}
                        {like.username && <div>{" " + like.username}</div>}
                        {!like.username && <div>Demo User/Group</div>}
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
            <br></br>
            {comments &&
              comments.map((comment) => (
                <div>
                  <div className='comment'>
                    <Link
                      to={`/user/${comment.username}`}
                      target='_blank'
                      className='nounderline'>
                      <div className='userdata'>
                        {!comment.userphoto && (
                          <img
                            src={logo}
                            alt='profilephoto'
                            className='user_image'
                          />
                        )}
                        {comment.userphoto && (
                          <img
                            src={`data:image/jpg;base64,${comment.userphoto}`}
                            alt='profilephoto'
                            className='user_image'
                          />
                        )}
                        <h3>{comment.content_}</h3>
                        {/* {comment.username === username && (
                          <button
                            style={{
                              color: "#fafafa",
                              backgroundColor: "#3DA3F4",
                              borderRadius: "8px",
                              borderColor: "#3DA3F4",
                            }}
                            onClick={deleteCommentHandler}>
                            Delete
                          </button>
                        )} */}
                      </div>
                      <br></br>
                    </Link>
                    {comment.username && <div>{" " + comment.username}</div>}
                    {!comment.username && <div>Demo User/Group</div>}
                  </div>
                  <br></br>
                </div>
              ))}
            <p>End of Comments</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TweetPage;

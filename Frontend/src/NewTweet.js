import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function post(url, body, callback) {
  let headers = new Headers();

  //console.log(headers);
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("Origin", "http://localhost:5000");

  let formData = new FormData();
  for (const [key, value] of Object.entries(body)) {
    formData.append(key, value);
  }
  //console.log(formData);

  fetch(url, {
    method: "POST",
    mode: "no-cors",
    credentials: "include",
    headers: headers,
    body: formData,
  })
    .then((json) => {
      console.log(json);
      callback(json);
    })
    .catch((err) => {
      console.log(err);
    });
}

const Create = () => {
  //const username = localStorage.getItem('username');
  const [username, setUsername] = useState();
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("username: ", username);
    const tweet = { username: username, content, photo };
    console.log(tweet);
    alert(JSON.stringify(tweet));

    post("http://localhost:5000/new_tweet", tweet, (res) => {
      console.log(res);
      navigate("/");
    });
  }

  return (
    <div className='create'>
      <h2>New Tweet</h2>
      <form onSubmit={handleSubmit}>
        <center>
          <h3>Content:</h3>
          <textarea
            style={{
              width: "90%",
              whiteSpace: "pre-wrap",
              overflow: "auto",
              fontSize: "20px",
            }}
            required
            value={content}
            rows={5}
            cols={40}
            placeholder='Type your content here...'
            onChange={(e) => {
              setContent(e.target.value);
              console.log(e.target.value);
            }}
          />
          <h3>Photo:</h3>
          <input type='file' onChange={(e) => setPhoto(e.target.files[0])} />
          <button>Add Tweet</button>
        </center>
      </form>
    </div>
  );
};

export default Create;

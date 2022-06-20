import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
      alert();
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
  const histroy = useHistory();

  useEffect(()=>{
    setUsername(localStorage.getItem('username'))
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("username: ", username);
    const tweet = { username: username, content, photo };
    console.log(tweet);

    post("http://localhost:5000/new_tweet", tweet, (res) => {
      console.log(res);
      alert("POsted");
      histroy.push("/");
    });
  }


  return (
    <div className='create'>
      <h2>New Tweet</h2>
      <form onSubmit={handleSubmit}>
        <label>Content:</label>
        <input
          type='text'
          required
          onChange={(e) => setContent(e.target.value)}
        />
        <label>Photo:</label>
        <input type='file' onChange={(e) => setPhoto(e.target.files[0])} />
        <button>Add Tweet</button>
      </form>
    </div>
  );
};

export default Create;

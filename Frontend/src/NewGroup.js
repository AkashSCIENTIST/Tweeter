import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewGroup = () => {
  function post(url, body, callback) {
    let headers = new Headers();

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

  const [groupname, setGroupName] = useState("");
  const [groupphoto, setGroupPhoto] = useState("");
  const [groupbio, setGroupBio] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const admin = localStorage.getItem("username");
    const Groupadded = { admin, groupname, groupphoto, groupbio };
    console.log(Groupadded);

    post("http://localhost:5000/new_group", Groupadded, () => {
      console.log("new Group added");
      navigate("/groups");
    });
  };

  return (
    <div className='create'>
      <h2>New Group</h2>
      <form onSubmit={handleSubmit}>
        <label>Group Name:</label>
        <input
          type='text'
          pattern='[^\s]+'
          required
          onChange={(e) => setGroupName(e.target.value)}
        />
        <label>Group Bio:</label>
        <input
          type='text'
          required
          onChange={(e) => setGroupBio(e.target.value)}
        />
        <label>Group Photo:</label>
        <input type='file' onChange={(e) => setGroupPhoto(e.target.files[0])} />
        <button>Create</button>
      </form>
    </div>
  );
};

export default NewGroup;

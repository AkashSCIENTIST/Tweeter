/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import "./votepage.css";

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

const Vote = () => {
  const [options, setOptions] = useState("optiona");
  const [choosed, setChoosed] = useState();
  const [question, setQuestion] = useState();
  const [optionCount, setOptionCount] = useState();
  const [voted, setVoted] = useState();
  const [author, setAuthor] = useState();
  const histroy = useHistory();
  const username = localStorage.getItem("username");
  const { pollid } = useParams();

  useEffect(() => {
    if (!username) {
      histroy.push("/");
    }
    var query = `http://localhost:5000/vote/${pollid}`;
    console.log(query);
    axios.get(query).then((response) => {
      console.log(response.data);
      setOptions(response.data.options);
      setQuestion(response.data.question);
      setChoosed(response.data.options[0]);
      setOptionCount(response.data.count);
      setAuthor(response.data.author);
      setVoted(response.data.voted.includes(username));
      //console.log(response.data.count);
      console.log("optionCount :", response.data.count);
      console.log("voted :", response.data.voted.includes(username));
    });
  }, []);

  const handleSubmit = (e) => {
    var data = {
      username,
      poll_id: pollid,
      option: choosed,
    };
    console.log(data);
    //alert(JSON.stringify(data));
    var url = "http://localhost:5000/cast_vote";
    post(url, data, (res) => {
      console.log(res);
    });
  };

  return (
    <>
      <p>
        Poll by :{" "}
        <a
          href={`http://localhost:3000/user/${author}`}
          target='_blank'
          rel='noreferrer'>
          @{author}
        </a>
      </p>
      {!voted && (
        <div className='create'>
          <h2>Vote</h2>
          <form onSubmit={handleSubmit}>
            <label>Question :</label>
            <p>{question}</p>
            <br></br>
            <label>Options:</label>
            <select
              value={choosed}
              onChange={(e) => setChoosed(e.target.value)}>
              <option value={options[0]}>{options[0]}</option>
              <option value={options[1]}>{options[1]}</option>
              {options[2] && <option value={options[2]}>{options[2]}</option>}
            </select>
            <br></br>
            <br></br>
            <button>Vote</button>
          </form>
        </div>
      )}
      <div>
        {voted && (
          <>
            You have already voted ...
            <br></br>
            <br></br>
            <h1>{question}</h1>
            <table className='votetable'>
              <tr>
                <th>Option</th>
                <th>Votes</th>
              </tr>

              {optionCount &&
                voted &&
                optionCount.map((count) => (
                  <tr>
                    <td>{count[0]}</td>
                    <td>{count[1]}</td>
                  </tr>
                ))}
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default Vote;

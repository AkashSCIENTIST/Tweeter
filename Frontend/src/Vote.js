/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./votepage.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      // alert();
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
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const { pollid } = useParams();

  useEffect(() => {
    if (!username) {
      navigate("/");
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

  const deletePoll = (e) => {
    confirmAlert({
      title: "Delete Poll",
      message: "Confirm ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .get(`http://localhost:5000/delete_poll/${pollid}`)
              .then((res) => {
                toast("Poll Deleted", {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
                navigate("/polls");
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
  };

  return (
    <>
      <p>
        Poll by :{" "}
        <a href={`http://localhost:3000/user/${author}`} rel='noreferrer'>
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
      {username === author && (
        <center>
          <br></br>
          <button
            onClick={deletePoll}
            style={{
              color: "white",
              backgroundColor: "blue",
              borderRadius: "15%",
              borderColor: "#3DA3F4",
              height: "50px",
              width: "120px",
              cursor: "pointer",
            }}>
            Delete Poll
          </button>
        </center>
      )}
      <ToastContainer />
    </>
  );
};

export default Vote;

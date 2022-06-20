/* eslint-disable no-unused-vars */
import MiniPoll from "./MiniPoll";
import Error from "./Error";
import Loading from "./Loading";
import useFetch from "./useFetch";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function PollFeed() {
  const {
    data: polls,
    isPending,
    error,
  } = useFetch(`http://localhost:5000/poll_feed`);
  console.log(polls);

  return (
    <>
      <Link to='/new_poll'>
        <button
          style={{
            color: "#fafafa",
            backgroundColor: "#1DA1F2",
            borderRadius: "8px",
            height: "40px",
            width: "100px",
            transform: "translateX(80px)",
            cursor: "pointer",
            borderColor: "#1DA1F2",
          }}>
          + New Poll
        </button>
      </Link>
      <br></br>
      <br></br>
      {polls &&
        polls.map((poll) => (
          <MiniPoll
            userphoto={poll.photo}
            name={poll.name}
            content={poll.content_}
            key={poll.id_}
            pollid={poll.id_}
          />
        ))}
      {error && <Error />}
      {isPending && <Loading />}
    </>
  );
}

export default PollFeed;

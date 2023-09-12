import Navbar from "./Navbar";
import Home from "./Home";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import TweetPage from "./TweetPage";
import NewTweet from "./NewTweet";
import SignUp from "./SignUp";
import NewPoll from "./NewPoll";
import SignIn from "./SignIn";
import Vote from "./Vote";
import UserProfile from "./UserProfile";
import PollFeed from "./PollFeed";
import AllUsers from "./AllUsers";
import ChatPage from "./ChatPage";
import GroupProfile from "./GroupProfile";
import GroupData from "./GroupData";
import NewGroup from "./NewGroup";

function MyApp() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='content'>
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route
              exact
              path='/tweetpage/:tweetid'
              element={<TweetPage />}></Route>
            <Route exact path='/create' element={<NewTweet />}></Route>
            <Route path='/signup' exact element={<SignUp />}></Route>
            <Route path='/signin' exact element={<SignIn />}></Route>
            {/* <Route path='/chats' exact element={<ChatPage />}></Route> */}
            <Route path='/new_poll' exact element={<NewPoll />}></Route>
            <Route path='/vote/:pollid' exact element={<Vote />}></Route>
            <Route path='/users' exact element={<AllUsers />}></Route>
            <Route
              path='/user/:username'
              exact
              element={<UserProfile />}></Route>
            <Route path='/polls' exact element={<PollFeed />}></Route>
            <Route
              path='/group/:groupname'
              exact
              element={<GroupProfile />}></Route>
            <Route path='/groups' exact element={<GroupData />}></Route>
            <Route path='/new_group' exact element={<NewGroup />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default MyApp;

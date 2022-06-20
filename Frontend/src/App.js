import Navbar from "./Navbar";
import Home from "./Home";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/tweetpage/:tweetid'>
              <TweetPage />
            </Route>
            <Route exact path='/create'>
              <NewTweet />
            </Route>
            <Route path='/signup'>
              <SignUp />
            </Route>
            <Route path='/signin'>
              <SignIn />
            </Route>
            <Route path='/chats'>
              <ChatPage />
            </Route>
            <Route path='/new_poll'>
              <NewPoll />
            </Route>
            <Route path='/vote/:pollid'>
              <Vote />
            </Route>
            <Route path='/users'>
              <AllUsers />
            </Route>
            <Route path='/user/:username'>
              <UserProfile />
            </Route>
            <Route path='/polls'>
              <PollFeed />
            </Route>
            <Route path='/group/:groupname'>
              <GroupProfile/>
            </Route>
            <Route path='/groups'>
              <GroupData/>
            </Route>
            <Route path='/new_group'>
              <NewGroup/>
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default MyApp;

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ChatView from "./Components/ChatView";
import TopAppBar from "./Components/Elements/TopAppBar";
import Inbox from "./Components/Inbox";
import Profile from "./Components/Profile";

export default function App() {

  return (
    <Router>
      <div>
        <TopAppBar />

        <Switch>
          <Route exact path="/">
            <Inbox />
          </Route>
          <Route exact path="/chat">
            <ChatView />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import ChatView from "./Components/ChatView";
import TopAppBar from "./Components/Elements/TopAppBar";
import Inbox from "./Components/Inbox";


const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline",
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    width: `100%`,
    zIndex: theme.zIndex.drawer + 1,
    marginLeft: drawerWidth,
  },
  appBarButton: {
    color: "white",
    textTransform: "capitalize",
  },
  appBarBottom: {
    top: "auto",
    bottom: 0,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  messageBoxContainer: {
    display: "contents",
  },
  messagesContainer: {
    display: "column-reverse",
  },
}));

export default function App() {
    const classes = useStyles();
    const [recepientDetails, setRecepientDetails] = useState({})

  return (
    <Router>
      <div>
        <TopAppBar classes={classes} />

        <Switch>
          <Route path="/">
            <Inbox setRecepient={setRecepientDetails} />
          </Route>
          <Route path="/chat">
            <ChatView recepient={recepientDetails} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

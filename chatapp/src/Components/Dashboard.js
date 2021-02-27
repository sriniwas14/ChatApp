import React, { useEffect, useRef, useState } from "react";
import {
  CssBaseline
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import TopAppBar from "./Elements/TopAppBar";
import ChatView from './ChatView';
import getSocketInstance from "../utils/socket";
import withAuth from "../withAuth";
import Inbox from "./Inbox";

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

function Dashboard(props) {
  const classes = useStyles();
  const [recepientDetails, setRecepientDetails] = useState({})

  return (
    <div className={classes.root}>
      <CssBaseline />
      <TopAppBar classes={classes} />
      {
        recepientDetails.chatId ? <ChatView recepient={recepientDetails} /> : (<Inbox setRecepient={setRecepientDetails} />)
      }
      
    </div>
  );
}

export default withAuth(Dashboard);

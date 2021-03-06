import React, { useEffect, useRef, useState } from "react";
import {
  IconButton,
  AppBar,
  Toolbar,
  Input,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import ChatContainer from "./Elements/ChatContainer";
import getSocketInstance from "../utils/socket";
import withAuth from "../Context/withData";
import api from "../utils/api";

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
  },
  messageBoxContainer: {
    display: "contents",
  },
  messagesContainer: {
    display: "column-reverse",
  },
}));

function ChatView(props) {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
    
  const socket = getSocketInstance();

  const chatInput = useRef();
  
  // Execute when roomId is present in selectedChat 
  useEffect(() => {
    if (!props.selectedChat.roomId) return
    // Fetch Messages
    api.get(`/chats/${props.selectedChat.roomId}`,{ headers: { "Authorization": `Bearer ${props.userDetails.token}`} })
    .then(result => {
      setMessages((messages) => [...result.data, ...messages])
    }).catch(err => {
      console.log("Couldn't Fetch Messages!", err)
    })

    // Listen For Incoming Messages
    socket.on("chat message", (message) => {
      console.log("New Message ", message)
      setMessages((messages) => [...messages, message]);
      socket.emit("mark seen", { chatId: props.selectedChat.roomId })
    });

    // Mark Newest Message As Seen
    socket.emit("mark seen", { chatId: props.selectedChat.roomId })
  }, []);
  
  // Execute when `roomId` is NOT present
  // instead use the username to create a new chat request when the first message is sent
  // Finally set the result of the new chat to set the `selectedChat` in the context 
  useEffect(() => {
    if (props.selectedChat.roomId) return

    socket.on("chat request", (message) => {
      console.log("New Request ", message)
      message.message = "New Request!"
      message.seen = 0
      message.sentAt = (new Date()).toISOString()
      message.username = props.selectedChat.username
      props.setSelectedChat(message)
    });

    // Listen For Incoming Messages
    socket.on("chat message", (message) => {
      console.log("New Message ", message)
      setMessages((messages) => [...messages, message]);
      socket.emit("mark seen", { chatId: props.selectedChat.roomId })
    });

    // Mark Newest Message As Seen
    socket.emit("mark seen", { chatId: props.selectedChat.roomId })
     
  }, [])

  let sendMessage = (e) => {
    e.preventDefault();
    let message = chatInput.current.value;
    const chatMessage = {
      chatId:props.selectedChat.roomId,
      messageFrom: props.userDetails.username,
      recepientId: props.selectedChat.username,
      message: chatInput.current.value,
    };

    if (message.length > 0) {
      socket.emit("send message", chatMessage);
      chatInput.current.value = "";
    }
    setMessages((messages => [...messages, chatMessage]))
  };

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.messagesContainer}>
          <ChatContainer messages={messages} />
        </div>
      </main>
      <AppBar position="fixed" color="white" className={classes.appBarBottom}>
        <Toolbar>
          <div className={classes.grow} />
          <form className={classes.messageBoxContainer} onSubmit={sendMessage}>
            <Input
              inputRef={chatInput}
              style={{ borderBottom: 0 }}
              fullWidth
              placeholder="Type Your Message..."
              inputProps={{ "aria-label": "description" }}
            />
            <IconButton type="submit" color="primary">
              <Send />
            </IconButton>
          </form>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withAuth(ChatView);
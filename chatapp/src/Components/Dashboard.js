import React from 'react';
import clsx from 'clsx';
import { Drawer, CssBaseline, IconButton, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemText, ListItemIcon, TextField, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { MoveToInbox, Mail, Menu, Send } from '@material-ui/icons';
import ChatBubble from './Elements/ChatBubble';


const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `100%`,
    zIndex: theme.zIndex.drawer + 1,
    marginLeft: drawerWidth,
  },
  appBarBottom: {
    top: 'auto',
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
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    marginRight: -drawerWidth
  },
  messagesContainer: {
    display: "column-reverse"
  }
}));

export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const toggleDrawerOpen = () => {
        setOpen(!open);
    };

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
                <Menu />
            </IconButton>
            <Typography variant="h6" noWrap>
              ChatApp
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar}>
            <Typography variant="h6" >Active Chats</Typography>
          </div>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <MoveToInbox /> : <Mail />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <MoveToInbox /> : <Mail />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
          <div className={classes.toolbar} />
          <div className={classes.messagesContainer}>
            <ChatBubble self={true} text="Hello There!" />
            <ChatBubble self={true} text="Hello There!" />
            <ChatBubble self={true} text="Hello There!" />
            <ChatBubble self={true} text="Hello There!" />
            <ChatBubble self={false} text="Hello There!" />
          </div>
        </main>
        <AppBar position="fixed" color="white" className={classes.appBarBottom}>
        <Toolbar>
          <div className={classes.grow} />
          <Input style={{ borderBottom: 0 }} fullWidth placeholder="Type Your Message..." inputProps={{ 'aria-label': 'description' }} />
          <IconButton color="primary">
            <Send />
          </IconButton>
        </Toolbar>
      </AppBar>
      </div>
    );
}

import React, { useState, useEffect } from 'react'
import { Menu, MenuItem, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { AccountCircle, ArrowBack } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core";
import { useLocation, useHistory } from 'react-router-dom';
import withData from '../../Context/withData';

const useStyles = makeStyles((theme) => ({
    root: {
      display: "inline",
    },
    grow: {
      flexGrow: 1,
    },
    appBar: {
      width: `100%`,
      zIndex: theme.zIndex.drawer + 1
    },
    appBarButton: {
      color: "white",
      textTransform: "capitalize",
    },
    appBarBottom: {
      top: "auto",
      bottom: 0,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })
    },
    messageBoxContainer: {
      display: "contents",
    },
    messagesContainer: {
      display: "column-reverse",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    }
  }));


function TopAppBar(props) {
    let location = useLocation();
    let history = useHistory();

    const classes = useStyles();
    const [backButtonVisible, setBackButtonVisible] = useState(false)
    const [title, setTitle] = useState("Inbox")
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    useEffect(() => {
      switch(location.pathname){
        case '/chat':
          setBackButtonVisible(true)
          setTitle(`${props.selectedChat.first_name} ${props.selectedChat.last_name}`)
          break;     
        default:
          setBackButtonVisible(false)
          setTitle("Inbox")
      }
    }, [location])
  
    const handleClose = (e) => {
      switch(e.target.innerText){
        case "Profile": 
          break;
        case "Log Out":
          props.setLoginDetails({ loggedIn: false, userDetails: {} })
          localStorage.removeItem("token")
          break;
        default:
      }
      setAnchorEl(null);
    };

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {
            backButtonVisible ? (<IconButton onClick={() => history.push('/') } edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <ArrowBack />
          </IconButton>) : ''
          }
            
            <Typography variant="h6" className={classes.title} noWrap>
              { title }
            </Typography>
          { /** User Menu  **/ }
          <Button className={classes.appBarButton} color="primary" onClick={handleMenu}>
            <AccountCircle />
            <span style={{ marginLeft: 10 }}>{props.userDetails.first_name}</span>
          </Button>
          <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Log Out</MenuItem>
              </Menu>
        </Toolbar>
      </AppBar>
    )
}

export default withData(TopAppBar);
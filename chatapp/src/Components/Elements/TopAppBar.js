import React from 'react'
import { IconButton, AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Menu, AccountCircle } from '@material-ui/icons';
import withAuth from '../../withAuth';

function TopAppBar(props) {
    let classes = props.classes

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={props.toggleDrawer}
              edge="start"
              className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <div className={classes.grow}>
            <Typography variant="h6" noWrap>
              ChatApp
            </Typography>
          </div>
          { /** User Menu  **/ }
          <Button className={classes.appBarButton} color="primary">
            <AccountCircle />
            <span style={{ marginLeft: 10 }}>{props.userDetails.first_name}</span>
          </Button>
        </Toolbar>
      </AppBar>
    )
}

export default withAuth(TopAppBar);
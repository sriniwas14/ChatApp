import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    paddingBottom: "40px !important",
    borderRadius: 20
  },
}));

export default function Login(props) {
  const [loginView, setLoginView] = useState("login");
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item md={4} style={{ flexGrow: 'inherit', margin: "auto" }}>
        <Paper elevation={0} className={classes.paper}>
          <div>
            <Typography
              color="primary"
              align="center"
              style={{ margin: loginView==="login" ? "50px 0" : "10px 0", cursor: "default" }}
              variant="h3"
              component="h3"
            >
              Chat<b>App</b>
            </Typography>
          </div>
          {loginView === "login" ? (
            <LoginForm
              setLoading={props.setLoading}
              setLoginView={setLoginView}
            />
          ) : (
            <RegisterForm setLogin={setLoginView} />
          )}
        </Paper>
      </Grid>
    </div>
  );
}

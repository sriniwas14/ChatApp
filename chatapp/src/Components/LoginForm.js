import React, { useState } from "react";
import { TextField, Link, Button, Snackbar } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import api from "../utils/api";

export default function LoginForm(props) {
  const [wrongCredentialsSnackbarVisible, setWrongCredentialsSnackbarVisible] = useState(false)
  const [somethingWrongVisible, setSomethingWrongVisible] = useState(false)
  const [loginSuccessVisible, setLoginSuccessVisible] = useState(false)

  const loginUser = (e) => {
    e.preventDefault()

    const username = e.target.username.value
    const password = e.target.password.value

    if(username==="" || password==="") return

    api
      .post("/users/login", {
        username,
        password,
      })
      .then((responce) => {
        if (responce.data.success) {
          setLoginSuccessVisible(true)
          handleSuccess(responce.data.token)
        } else {
          if (responce.data.err === "notexist") {
            setWrongCredentialsSnackbarVisible(true)
          }
        }
      })
      .catch((err) => {
        setSomethingWrongVisible(true)
        console.log("Err ", err);
      });
  };

  const handleSuccess = (token) => {
    setTimeout(()=> {
      localStorage.setItem("token", token);
      props.setLoading(true);
    }, 2200)
  }

  return (
    <div>
    <form onSubmit={loginUser}>
      <div>
        <TextField
          name="username"
          fullWidth
          id="filled-basic"
          label="E-mail"
          type="email"
          variant="outlined"
        />
      </div>
      <br />
      <div>
        <TextField
          fullWidth
          name="password"
          type="password"
          id="filled-basic"
          label="Password"
          variant="outlined"
        />
      </div>
      <br />
      <div>
        <Button
          disableElevation
          fullWidth
          style={{ marginBottom: 10 }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Sign In
        </Button>
      </div>
    </form>
    <div>
    <Button
          disableElevation
          fullWidth
          onClick={() => props.setLoginView("register")}
          variant="contained"
          color="secondary"
        >
          Register
        </Button>
      </div>
      <br />
      <div></div>
      <br />
      <div style={{ textAlign: "center" }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => {
            console.info("I'm a button.");
          }}
        >
          Forgot Password
        </Link>
      </div>
      <Snackbar open={wrongCredentialsSnackbarVisible} autoHideDuration={2000} onClose={() => setWrongCredentialsSnackbarVisible(false) }>
        <Alert onClose={() => setWrongCredentialsSnackbarVisible(false) } severity="error">
          Wrong Username/Password
        </Alert>
      </Snackbar>
      <Snackbar open={somethingWrongVisible} autoHideDuration={2000} onClose={() => setSomethingWrongVisible(false) }>
        <Alert onClose={() => setSomethingWrongVisible(false) } severity="error">
          Server Error!
        </Alert>
      </Snackbar>
      <Snackbar open={loginSuccessVisible} autoHideDuration={2000} onClose={() => setLoginSuccessVisible(false) }>
        <Alert onClose={() => setSomethingWrongVisible(false) } severity="success">
          Login Successful! 
        </Alert>
      </Snackbar>
    </div>
  );
}

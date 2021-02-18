import React, { useState } from "react";
import { TextField, Link, Button } from "@material-ui/core";
import api from "../utils/api";

export default function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    api
      .post("/users/login", {
        username,
        password,
      })
      .then((responce) => {
        if (responce.data.success) {
          localStorage.setItem("token", responce.data.token);
          props.setLoading(true);
        } else {
          if (responce.data.err === "notexist") {
            alert("Wrong E-Mail/Password");
          }
        }
      })
      .catch((err) => {
        alert();
        console.log("Err ", err);
      });
  };

  return (
    <div>
      <div>
        <TextField
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          id="filled-basic"
          label="E-mail"
          variant="outlined"
        />
      </div>
      <br />
      <div>
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
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
          onClick={() => loginUser()}
          style={{ marginBottom: 10 }}
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
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
    </div>
  );
}

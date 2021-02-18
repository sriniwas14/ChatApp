import React, { useState } from "react";
import { TextField, Link, Button } from "@material-ui/core";
import api from "../utils/api";

export default function RegisterForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = (e) => {
    e.preventDefault()
    api
      .post("/users/register", {
        username: e.target.email.value,
        password: e.target.password.value,
        first_name: e.target.firstName.value,
        last_name: e.target.lastName.value,
        phone: e.target.phone.value,
      })
      .then((responce) => {
        if (responce.data.success) {
          alert("User Created!")
        } else {
          if (responce.data.err === "exists") {
            alert("User Exists");
          }
        }
      })
      .catch((err) => {
        alert();
        console.log("Err ", err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitted! ")
  }

  return (
    <form onSubmit={registerUser}>
      <div>
        <TextField
          fullWidth
          name="firstName"
          id="filled-basic"
          label="First Name"
          required
          type="text"
          variant="outlined"
        />
      </div>
      <br />
      <div>
        <TextField
          fullWidth
          name="lastName"
          id="filled-basic"
          label="Last Name"
          required
          type="text"
          variant="outlined"
        />
      </div>
      <br />
      <div>
        <TextField
          fullWidth
          name="email"
          id="filled-basic"
          label="E-Mail"
          required
          type="email"
          variant="outlined"
        />
      </div>
      <br />
      <div>
        <TextField
          fullWidth
          name="phone"
          id="filled-basic"
          label="Phone"
          required
          type="phone"
          variant="outlined"
        />
      </div>
      <br />
      <div>
        <TextField
          fullWidth
          name="dob"
          id="filled-basic"
          label="Birthday"
          defaultValue="1-1-2001"
          required
          type="date"
          variant="outlined"
        />
      </div>
      <br />
      <div>
        <TextField
          fullWidth
          required
          name="password"
          type="password"
          id="filled-basic"
          label="Password"
          variant="outlined"
        />
      </div>
      <br />
      <div>
        <TextField
          fullWidth
          required
          name="confirmPassword"
          type="password"
          id="filled-basic"
          label="Confirm Password"
          variant="outlined"
        />
      </div>
      <br />
      <div>
        <Button
          disableElevation
          fullWidth
          type="submit"
          variant="contained"
          color="secondary"
        >
          Register
        </Button>
      </div>
      <br />
      <div></div>
      <br />
    </form>
  );
}

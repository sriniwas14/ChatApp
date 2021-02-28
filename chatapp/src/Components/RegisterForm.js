import React, { useState } from "react";
import { TextField, Snackbar, Button } from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import api from "../utils/api";
import Progress from "./Elements/Progress";

export default function RegisterForm(props) {
  const [userExistsVisible, setUserExistsVisible] = useState(false)
  const [somethingWrongVisible, setSomethingWrongVisible] = useState(false)
  const [registrationSuccessfulVisible, setRegistrationSuccessfulVisible] = useState(false)
  const [requestLoaderVisible, setrequestLoaderVisible] = useState(false)

  const registerUser = (e) => {
    e.preventDefault()
    setrequestLoaderVisible(true)
    
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
          setRegistrationSuccessfulVisible(true)
          handleSuccess()
        } else {
          if (responce.data.err === "exists") {
            setUserExistsVisible(true)
          }
        }
        setrequestLoaderVisible(false)
      })
      .catch((err) => {
        setrequestLoaderVisible(false)
        setSomethingWrongVisible(true)
        console.log("Err ", err);
      });
  };

  const handleSuccess = () => {
    setTimeout(()=> {
      props.setLogin("login");
    }, 2200)
  }

  const handleGoBack = (e) => {
    e.preventDefault()
    props.setLogin("login")
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
      <Button
          disableElevation
          fullWidth
          type="submit"
          variant="contained"
          color="danger"
          onClick={handleGoBack}
        >
          Go Back
        </Button>

      <Snackbar open={userExistsVisible} autoHideDuration={2000} onClose={() => setUserExistsVisible(false) }>
        <Alert onClose={() => setUserExistsVisible(false) } severity="warning">
          This email already has an Account
        </Alert>
      </Snackbar>
      <Snackbar open={somethingWrongVisible} autoHideDuration={2000} onClose={() => setSomethingWrongVisible(false) }>
        <Alert onClose={() => setSomethingWrongVisible(false) } severity="error">
          Server Error!
        </Alert>
      </Snackbar>
      <Snackbar open={registrationSuccessfulVisible} autoHideDuration={2000} onClose={() => setRegistrationSuccessfulVisible(false) }>
        <Alert onClose={() => setRegistrationSuccessfulVisible(false) } severity="success">
          Registration Successful!
        </Alert>
      </Snackbar>
      <Progress open={requestLoaderVisible} />
    </form>
  );
}

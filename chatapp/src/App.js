import React, { useState, useEffect } from 'react';
import Dashboard from './Components/Dashboard';
import Login from "./Components/Login";
import { authCheck } from './utils/auth'

function App() {
  const [loading, setLoading] = useState(true)
  const [loginDetails, setLoginDetails] = useState({ loggedIn : false })

  useEffect(() => {
    authCheck((status, token) => {
      setLoading(false)

      if(status){
        setLoginDetails({
          loggedIn: true,
          userDetails: token
        })
      }
    })
  }, [loading])

  if(loading){
    return (
      <>
        Loading
      </>
    )
  } else {
    return (
      <div className="App">
        {
          loginDetails.loggedIn ? (<Dashboard />) : (
            <Login setLoading={setLoading} />
          )
        }
      </div>
    );
  }
}

export default App;

import React, { useState, useEffect } from 'react';
import Routes from './Routes';
import Login from "./Components/Login";
import { authCheck } from './utils/auth';
import AuthContext from './Context/AuthContext';

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
        <AuthContext.Provider value={{ 
            userDetails: loginDetails.userDetails,
            setLoginDetails
         }}>
        {
          loginDetails.loggedIn ? (<Routes />) : (
            <Login setLoading={setLoading} />
          )
        }
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;

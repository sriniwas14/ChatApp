import React, { useState, useEffect } from 'react';
import Routes from './Routes';
import Login from "./Components/Login";
import { authCheck } from './utils/auth';
import DataContext from './Context/DataContext';
import getSocketInstance from "./utils/socket";

function App() {
  const [loading, setLoading] = useState(true)
  const [loginDetails, setLoginDetails] = useState({ loggedIn : false })
  const [selectedChat, setSelectedChat] = useState({})

  useEffect(() => {
    authCheck((status, decodedToken) => {
      setLoading(false)

      if(status){
        setLoginDetails({
          loggedIn: true,
          userDetails: decodedToken
        })

        getSocketInstance(decodedToken.username)
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
        <DataContext.Provider value={{ 
            userDetails: loginDetails.userDetails,
            setLoginDetails,
            selectedChat,
            setSelectedChat
         }}>
        {
          loginDetails.loggedIn ? (<Routes />) : (
            <Login setLoading={setLoading} />
          )
        }
        </DataContext.Provider>
      </div>
    );
  }
}

export default App;

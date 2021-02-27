import React from "react";

const AuthContext = React.createContext({ userDetails: {}, selectedChat: {} });

export default AuthContext;
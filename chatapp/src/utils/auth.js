import jwtDecode from "jwt-decode"

export let authCheck = (callback) => {
    const token = window.localStorage.getItem("token")

    if(token){
        const decodedToken = jwtDecode(token)
        decodedToken.token = token
        callback(true, decodedToken)
        return
    } else {
        callback(false)
        return
    }
}
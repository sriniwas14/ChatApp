import jwtDecode from "jwt-decode"

export let authCheck = (callback) => {
    const token = window.localStorage.getItem("token")

    if(token){
        const decodedToken = jwtDecode(token)
        decodedToken.token = token
        const currentTimestamp = Math.ceil((new Date()).getTime()/1000)

        if(decodedToken.exp<currentTimestamp){
            callback(false)
            return
        }

        callback(true, decodedToken)
        return
    } else {
        callback(false)
        return
    }
}
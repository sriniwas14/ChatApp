import React from 'react'
import AuthContext from './AuthContext'

const withAuth = (Component) => {
    return (props) => {
        return (
            <AuthContext.Consumer>
                { (context) => <Component {...props} { ...context } /> }
            </AuthContext.Consumer>
        )
    }
}

export default withAuth;
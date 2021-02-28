import React, { useEffect, useState } from 'react'
import { CircularProgress } from "@material-ui/core";

const styles = {
    root: {
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: "flex",
        background: "rgba(0,0,0,0.1)",
        transition: "0.1s ease-in-out"
    },
    container: {
        padding: 10,
        borderRadius: 10,
        boxShadow: "0 0 21px -11px",
        background: "white",
        margin: "auto"
    }
}

export default function Progress(props) {
    const loginProp = props.open
    const [visible, setVisible] = useState(loginProp)

    useEffect(() => {
        setVisible(loginProp)
    }, [loginProp])

    return (
        <div style={{...styles.root, display: visible===true ? "flex" : "none" }}>
            <div style={styles.container}>
                <div>
                <CircularProgress />
                </div>
            </div>
        </div>
    )
}

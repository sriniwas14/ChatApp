import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    chatBubbleContainer: {
        paddingTop: 5,
        paddingBottom: 5
    },
    chatBubbleSelf: {
        background: theme.palette.primary.main,
        color: 'white',
        borderRadius: "15px 15px 0 15px",
        padding: 15,
        maxWidth: '75%',
        display: 'inline-block'
    },
    chatBubble: {
        background: '#e5e5e5',
        color: 'black',
        borderRadius: 10,
        padding: 15,
        maxWidth: '75%',
        display: 'inline-block'
    }
}));

export default function ChatBubble(props) {
    const classes = useStyles();

    return (
        <div className={classes.chatBubbleContainer} style={{textAlign: (props.self) ? 'right' : 'left'}}>
            <span className={props.self ? classes.chatBubbleSelf : classes.chatBubble}>
                { props.text }
            </span>
        </div>
    )
}

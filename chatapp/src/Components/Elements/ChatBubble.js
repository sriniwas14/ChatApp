import React from 'react'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    chatBubbleContainer: {
        paddingTop: 15,
        paddingBottom: 15
    },
    chatBubbleSelf: {
        background: theme.palette.primary.main,
        color: 'white',
        borderRadius: 10,
        padding: 15,
        maxWidth: '60%'
    },
    chatBubble: {
        background: '#e5e5e5',
        color: 'black',
        borderRadius: 10,
        padding: 15,
        maxWidth: '60%'
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

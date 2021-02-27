import React,{ useEffect } from 'react'
import withAuth from '../../Context/withAuth';
import ChatBubble from './ChatBubble';

function ChatContainer(props) {
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight)
    }, [props.messages])
    return (
        <div style={{ marginBottom:78 }}>
            {
              props.messages.map(message => <ChatBubble self={props.userDetails.username===message.messageFrom ? true : false } text={message.message} />)
            }
        </div>
    )
}

export default withAuth(ChatContainer)
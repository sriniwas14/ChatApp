import React,{ useEffect } from 'react'
import ChatBubble from './ChatBubble';

export default function ChatContainer(props) {
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight)
    }, [props.messages])
    return (
        <div style={{ marginBottom:78 }}>
            {
              props.messages.map(message => <ChatBubble self={true} text={message.message} />)
            }
        </div>
    )
}

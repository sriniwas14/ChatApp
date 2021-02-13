import React,{ useEffect } from 'react'
import ChatBubble from './ChatBubble';

export default function ChatContainer(props) {
    useEffect(() => {
        console.log("Messages : ", JSON.stringify(props.messages))
    }, [props.messages])
    return (
        <div>
            {
              props.messages.map(message => <ChatBubble self={true} text={message.message} />)
            }
        </div>
    )
}

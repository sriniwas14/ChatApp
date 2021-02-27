import React, { useEffect, useState } from 'react'
import { AccountCircle } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import withAuth from '../Context/withData'
import api from '../utils/api'

const ChatItem = (props) => {
    const history = useHistory();

    const openChatView = (recepient) => {
        props.setRecepient(recepient)
        history.push('/chat')
    }

    return (
        <div onClick={()=> openChatView(props.recepient) } style={{ padding: 15, fontSize: 16, display: 'flex', cursor: 'default' }}><AccountCircle/> <span style={{ marginLeft: 10 }}>{ props.recepient.username }</span></div>
    )
}

const Inbox = (props) => {
    const [chats, setChats] = useState([])

    useEffect(() => {
        console.log(props)
        api.get(`/chats?from=${props.userDetails.username}`,{ headers: { "Authorization": `Bearer ${props.userDetails.token}`} })
        .then(res => setChats(res.data))
        .catch(err => console.log(err)
        )
    }, [])

    return (
        <div>
            <br />
            <br />
            <br />
            <div style={{ display: "block" }}>
            {
                chats.map(chat => <ChatItem key={chat.chatId} recepient={{ chatId: chat.roomId , username:chat.username}} setRecepient={props.setSelectedChat} />)
            }
            </div>
        </div>
    )
}

export default withAuth(Inbox)
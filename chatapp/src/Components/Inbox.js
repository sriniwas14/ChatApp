import React, { useEffect, useState } from 'react'
import { AccountCircle } from '@material-ui/icons';
import withAuth from '../withAuth'
import api from '../utils/api'

const ChatItem = (props) => {
    return (
        <div onClick={()=> props.setRecepient(props.recepient)} style={{ padding: 15, fontSize: 16, display: 'flex', cursor: 'default' }}><AccountCircle/> <span style={{ marginLeft: 10 }}>{ props.recepient.username }</span></div>
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
                chats.map(chat => <ChatItem recepient={{ chatId: chat.roomId , username:chat.username}} setRecepient={props.setRecepient} />)
            }
            </div>
        </div>
    )
}

export default withAuth(Inbox)
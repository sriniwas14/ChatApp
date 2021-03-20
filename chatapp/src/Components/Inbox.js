import React, { useEffect, useState } from 'react';
import { Chat as ChatIcon, DoneAll } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import withAuth from '../Context/withData';
import api from '../utils/api';
import { Avatar, Fab } from '@material-ui/core';
import SearchDialog from './Elements/SearchDialog';
import getSocketInstance from "../utils/socket";
import { getTimeFromTimestamp } from "../utils/misc";

const ChatItem = (props) => {
    const history = useHistory();

    const openChatView = (recepient) => {
        props.setRecepient(recepient)
        history.push('/chat')
    }

    return (
        <div onClick={()=> openChatView(props.recepient) } className="InboxChatItem">
            <Avatar className="ChatAvatar">{props.recepient.username[0].toUpperCase()}</Avatar>
            <div className={ `ChatItemLeftItems ${(props.recepient.seen ===0 && props.recepient.messageFrom!==props.username) ? "ChatItemLeftUnread" : ""}` }>
                <div className="ChatItemName">{ props.recepient.first_name+' '+props.recepient.last_name }</div>
                <div className="ChatItemMessage"><DoneAll style={{ fontSize: 16, marginBottom: -3, marginRight: 6 }} color={props.recepient.seen===1 ? "primary" : "default"} />{ props.recepient.message }</div>
            </div>
            <div className="ChatItemRightItems">
                <div className="ChatItemTime">{ getTimeFromTimestamp(props.recepient.sentAt) }</div>
            </div>
        </div>
    )
}

const Inbox = (props) => {
    const [chats, setChats] = useState([])
    const [searchDialogOpen, setSearchDialogOpen] = useState(false)
    const socket = getSocketInstance()

    const getUpdatedMessages = (chatRooms, message) => {
        return chatRooms.map(chat => {
            if (chat.username!==message.messageFrom) return chat
            return {
                ...chat,
                message: message.message,
                messageFrom: message.messageFrom,
                sentAt: (new Date()).toISOString(),
                seen: 0
            }
        })
    }

    useEffect(() => {
        // Loading All Chats
        api.get(`/chats?from=${props.userDetails.username}`,{ headers: { "Authorization": `Bearer ${props.userDetails.token}`} })
        .then(res => setChats(res.data))
        .catch(err => console.log(err)
        )

        // TODO: Listening For New Messages, New Chat Messages Should Update the Inbox
        socket.on("chat message", (message) => {
            setChats((c) => getUpdatedMessages(c, message))
        });
    }, [])

    return (
        <div>
            <div style={{ display: "block" }}>
            {
                chats.map(chat => <ChatItem key={chat.chatId} recepient={chat} username={props.userDetails.username} setRecepient={props.setSelectedChat} />)
            }
            <Fab onClick={() => setSearchDialogOpen(true) } color="primary" style={{ position: 'fixed', bottom: 20, right: 20 }} aria-label="add">
                <ChatIcon />
            </Fab>
            <SearchDialog open={searchDialogOpen} setRecepient={props.setSelectedChat} setOpen={setSearchDialogOpen} />
            </div>
        </div>
    )
}

export default withAuth(Inbox)
import React, { useEffect, useState } from 'react';
import { Chat as ChatIcon } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import withAuth from '../Context/withData';
import api from '../utils/api';
import { Avatar, Fab } from '@material-ui/core';
import SearchDialog from './Elements/SearchDialog';

const styles = {
    chatItemName: {
        fontSize: 18
    },
    chatItemMessage: {
        color: '#999999',
        fontSize: 13
    },
    avatarLarge: {
        height: 50,
        width: 50
    }
}

const ChatItem = (props) => {
    const history = useHistory();

    const openChatView = (recepient) => {
        props.setRecepient(recepient)
        history.push('/chat')
    }

    const getTime = (timestamp) => {
        const d = new Date(timestamp)
        const prependZero = (number) => {
            if(number<10) return '0'+number.toString()
            return number
        }

        return `${prependZero(d.getHours())}:${prependZero(d.getMinutes())}`
    }

    return (
        <div onClick={()=> openChatView(props.recepient) } style={{ padding: 15, fontSize: 16, display: 'flex', cursor: 'default' }}>
            <Avatar style={ styles.avatarLarge }>{props.recepient.username[0].toUpperCase()}</Avatar>
            <div style={{ marginLeft: 10, marginTop: 'auto', marginBottom: 'auto' }}>
                <div style={styles.chatItemName}>{ props.recepient.first_name+' '+props.recepient.last_name }</div>
                <div style={styles.chatItemMessage}>{ props.recepient.message }</div>
            </div>
            <div style={{ display: 'flex', marginLeft: 'auto' }}>
                <div style={{ margin: 'auto' }}>{ getTime(props.recepient.sentAt) }</div>
            </div>
        </div>
    )
}

const Inbox = (props) => {
    const [chats, setChats] = useState([])
    const [searchDialogOpen, setSearchDialogOpen] = useState(false)

    useEffect(() => {
        console.log(props)
        api.get(`/chats?from=${props.userDetails.username}`,{ headers: { "Authorization": `Bearer ${props.userDetails.token}`} })
        .then(res => setChats(res.data))
        .catch(err => console.log(err)
        )
    }, [])

    return (
        <div>
            <div style={{ display: "block" }}>
            {
                chats.map(chat => <ChatItem key={chat.chatId} recepient={chat} setRecepient={props.setSelectedChat} />)
            }
            <Fab onClick={() => setSearchDialogOpen(true) } color="primary" style={{ position: 'fixed', bottom: 20, right: 20 }} aria-label="add">
                <ChatIcon />
            </Fab>
            <SearchDialog open={searchDialogOpen} setOpen={setSearchDialogOpen} />
            </div>
        </div>
    )
}

export default withAuth(Inbox)
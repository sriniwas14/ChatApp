import React, { useState, useEffect } from 'react'
import { Dialog, TextField } from '@material-ui/core'
import api from '../../utils/api'
import withData from '../../Context/withData'
import { Avatar } from '@material-ui/core';


const styles = {
    chatItemName: {
        fontSize: 18
    },
    chatItemUsername: {
        color: '#999999',
        fontSize: 13
    },
    avatarLarge: {
        height: 50,
        width: 50
    }
}

function SearchDialog(props) {
    const [users, setUsers] = useState([]                                                                   )

    const searchHandler = (e) => {                                                          
        const searchQuery = e.target.value
        if(searchQuery.length<3) return

        api.get(`/users?search=${ searchQuery }`, { headers: { "Authorization": `Bearer ${props.userDetails.token}`} })
        .then(result => {
            if(result.data==false) {
                setUsers([])
                return
            }

            setUsers(result.data)
        }).catch(err => {
            console.log("Search Err ", err)
        })
    }

    return (
        <Dialog maxWidth="sm" fullWidth={true} onClose={()=> props.setOpen(false)} open={props.open}>
            <div style={{ padding : 20 }}>
                <TextField style={{ width: "100%", marginBottom : users.length>0 ? 10 : 0 }} onChange={searchHandler} id="outlined-basic" label="Search Users" autoFocus={true} variant="outlined" />

                {
                    users.map(user => (
                        <div style={{ display: 'flex' }}>
                            <Avatar style={ styles.avatarLarge }>{user.username[0].toUpperCase()}</Avatar>
                            <div style={{ marginLeft: 10, marginTop: 'auto', marginBottom: 'auto' }}>
                                <div style={ styles.chatItemName }>{ `${user.first_name} ${user.last_name}` }</div>
                                <div style={ styles.chatItemUsername }>{ user.username }</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Dialog>
    )
}

export default withData(SearchDialog)
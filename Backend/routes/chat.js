const { getAllChats, getChatMessages } = require('../models/chat');
const chatRoutes = require('express').Router();

chatRoutes.get('/', (req, res)=> {    
    getAllChats(req.query['from'], (result) => {
        res.send(result)
    });
});

chatRoutes.get('/:id', (req, res) => {
    getChatMessages(req.params['id'], req.token.username, (result) =>{
        res.send(result)
    })
})

module.exports = chatRoutes;
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
app.use(express.static(publicPath));

var server = http.createServer(app).listen(port, ()=>{
        console.log(`Server is up on port ${port}`);
});

var io = socketIO.listen(server);
io.on('connection', (socket)=>{
    console.log('New user connected');
    
    socket.emit('newMessage',generateMessage('Admin', 'Welcome to Chat App'));
   
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

    socket.on('createMessage', (message, callback)=>{
        console.log('createMessage', message);

        io.emit('newMessage',generateMessage(message.from, message.text));
        callback('This is from the server');
        // socket.broadcast.emit('newMessage',{
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

    });
    
    socket.on('disconnect',()=>{
        console.log('User disconnected.');
    });
});



const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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
    
    socket.emit('newMessage', {
        from: 'Faisal',
        text: 'See you then',
        createdAt: 123
    });

    socket.on('createMessage', (message)=>{
        console.log('createMessage', message);
    });
    
    socket.on('disconnect',()=>{
        console.log('User disconnected.');
    });
});


